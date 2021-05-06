function cleanString(value, mapObj){
  return Object.keys(mapObj).reduce( (acc, cur) => acc.split(cur).join(mapObj[cur]), value)
}

const STANDARD_COLOR = 'Black';
/*
const HIGHLIGHT_COLOR = '#007bff';
const MUTED_COLOR = '#CCCCCC'
*/

function generateDOT(module, options = {}) {

  let relatedStates = {};

  const selectedState = options.selectedState;
  const selectedStateTransition = options.selectedStateTransition;
  const moduleHistory = options.moduleHistory;

  if(selectedState) {
    Object.keys(module.states).forEach( key => {
      let state = module.states[key];

      let allTransitions = findTransitions(module.states[key])

      if(allTransitions[selectedState.name]){
        relatedStates[state.name] = true;
      }

    });

    relatedStates = Object.assign({}, relatedStates, findTransitions(module.states[selectedState.name]))

  }

  let output =  ['digraph G {',
          nodesAsDOT(module, selectedState, relatedStates, moduleHistory),
          transitionsAsDOT(module, selectedState, selectedStateTransition, moduleHistory),
         '}'
         ].join('\n');

  return output;

}

const nodesAsDOT = (module, selectedState, relatedStates, moduleHistory) => {

  return Object.keys(module.states).filter(name => typeof module.states[name] === 'object').map( name => {

    let state = module.states[name]
    state['name'] = name

    let node = {
      id: 'node_' + escapeId(name),
      shape: 'record',
      style: 'rounded,filled',
      fillcolor: 'White',
      fontcolor: STANDARD_COLOR
    }

    if(state['type'] === 'Initial' || state['type'] === 'Terminal'){
        node['fillcolor'] = 'Grey'
        node['style'] = 'rounded,filled'
        node['fontcolor'] = 'White'
    }

    if(selectedState) {
      if (state.name === selectedState.name){
        node['fillcolor'] = 'White'
        node['class'] = 'node-highlighted'
      } else if (!relatedStates[state.name]){
        node['class'] = 'node-muted'
      }
    } else if (moduleHistory) {
      if (moduleHistory.includes(state.name)) {
        node['fillcolor'] = 'White'
        node['class'] = 'node-highlighted'
      } else {
        node['class'] = 'node-muted'
      }
    }

    let details = stateDescription(state)
    if(details.length === 0){
      node['label'] = (name === state['type']) ? state['name'] : `{ ${name} | ${state['type']} }`
    } else {
      node['label'] = `{ ${name} | { ${state['type']} | ${details} } }`
    }

    node['label'] = escapeLabel(node['label']);

    let params = Object.keys(node).map((key) => `${key} = "${node[key]}"`).join(", ");

    return `"${escapeName(name)}" [${params};]`

  }).join("\n");

}

const transitionsAsDOT = (module, selectedState, selectedStateTransition, moduleHistory) => {


  return Object.keys(module.states).map( name => {

    const transitionHistory = [];
    if (moduleHistory && moduleHistory.includes(name)) {
      let addNext = false;
      moduleHistory.forEach((m) => {
        if (addNext) {
          transitionHistory.push(m);
        }
        addNext = false;
        if (m === name)
        {
          addNext = true;
        }
      });
    }

    let state = module.states[name]
    let escapedName = escapeName(name);

    let checkDestInHistory = transitionHistory.length > 0;

    let className='';

    if(!!selectedState){
      className = 'transition-muted'
    }

    if(selectedState && selectedState.name === name){
      className='transition-highlighted'
    }

    if(state.direct_transition !== undefined){
      if(selectedState && state.direct_transition === selectedState.name && selectedState.name !== name){
        className='';
      }

      if (moduleHistory) {
          if (checkDestInHistory && transitionHistory.includes(state.direct_transition)) {
            className='transition-highlighted'
          } else {
            className = 'transition-muted'
          }
      }


      if(selectedStateTransition === 0 ){
        className += ' transition-selected';
      }

      if(module.states[state.direct_transition]){
        return `  "${escapedName}" -> "${escapeName(module.states[state.direct_transition].name)}" [class = "transition transition-index_0 ${className}"];\n`
      } else {
        console.log(`NO SUCH NODE TO TRANSITION TO: ${state.direct_transition} FROM ${name}`);
      }
    } else if(state.distributed_transition !== undefined){
      let out_transitions = ''
      state.distributed_transition.forEach( (t, i) => {
        let transitionClassName = className
        let distLabel = ''
        if(typeof t.distribution === 'object'){
          distLabel = `p(${t.distribution.attribute})`
          if(t.distribution.default){
            let pct = t.distribution.default * 100
            distLabel += `, default ${pct}%`
          }
        } else {
          let pct = t.distribution * 100
          distLabel = `${pct}%`
        }
        if(module.states[t.transition]){
          if(selectedState && t.transition === selectedState.name && selectedState.name !== name){
            transitionClassName = '';
          }

          if (moduleHistory) {
            if (checkDestInHistory && transitionHistory.includes(t.transition)) {
              transitionClassName = 'transition-highlighted'
            } else {
              transitionClassName = 'transition-muted'
            }
          }

          if(selectedStateTransition === i){
            transitionClassName += ' transition-selected';
          }
          out_transitions += `  "${escapedName}" -> "${escapeName(module.states[t.transition].name)}" [label = "${distLabel}", class = "transition transition-index_${i} ${transitionClassName}"];\n`
        } else {
          console.log(`NO SUCH NODE TO TRANSITION TO: ${t.transition} FROM ${name}`);
        }
      })
      return out_transitions
    } else if (state.conditional_transition !== undefined){
      let out_transitions = ''
      state.conditional_transition.forEach( (t, i ) => {
        let transitionClassName = className
        let cnd = t.condition !== undefined ? logicDetails(t.condition) : 'else';
        if(module.states[t.transition]){
          if(selectedState && t.transition === selectedState.name){
            transitionClassName = ''
          }

          if (moduleHistory) {
            if (checkDestInHistory && transitionHistory.includes(t.transition)) {
              transitionClassName = 'transition-highlighted'
            } else {
              transitionClassName = 'transition-muted'
            }
          }

          if(selectedStateTransition === i){
            transitionClassName += ' transition-selected';
          }
          out_transitions += `  "${escapedName}" -> "${escapeName(module.states[t.transition].name)}" [label = "${i+1}. ${cnd}", class = "transition transition-index_${i} ${transitionClassName}"];\n`
        } else {
          console.log(`NO SUCH NODE TO TRANSITION TO: ${t.transition} FROM ${name}\n`);
        }
      })
     return out_transitions

    } else if (state.complex_transition !== undefined){
      let transitions = {}
      let nodeHighlighted = {}
      state.complex_transition.forEach( (t, i) => {
        let cnd = t.condition !== undefined ? logicDetails(t['condition']) : 'else'
        if(t.transition !== undefined){
          if(module.states[t.transition]){
            let nodes = `  "${escapedName}" -> "${t.transition}"`
            if(selectedState && t.transition === selectedState.name){
              nodeHighlighted[nodes] = 'standard'
            }
            if(selectedState && name === selectedState.name){
              nodeHighlighted[nodes] = 'highlighted'
            }

            if (moduleHistory) {
              if (checkDestInHistory && transitionHistory.includes(t.transition)) {
                nodeHighlighted[nodes] = 'highlighted'
              } else {
                nodeHighlighted[nodes] = 'muted'
              }
            }

            if(transitions[nodes] === undefined){
              transitions[nodes] = [];
            }
            transitions[nodes].push(cnd)
          } else {
            console.log(`NO SUCH NODE TO TRANSITION TO: ${t.transition} FROM ${name}`);
          }
        } else {
          t.distributions.forEach( dist => {
            if(module.states[dist.transition]){
              let pct = dist.distribution * 100
              let nodes = `  "${escapedName}" -> "${dist.transition}"`
              if(selectedState && dist.transition === selectedState.name){
                nodeHighlighted[nodes] = 'standard'
              }
              if(selectedState && name === selectedState.name){
                nodeHighlighted[nodes] = 'highlighted'
              }
              if (moduleHistory) {
                if (checkDestInHistory && transitionHistory.includes(dist.transition)) {
                  nodeHighlighted[nodes] = 'highlighted'
                } else {
                  nodeHighlighted[nodes] = 'muted'
                }
              }            
              if(transitions[nodes] === undefined){
                transitions[nodes] = [];
              }
              transitions[nodes].push(`${cnd}: ${pct}%`)
            } else {
              console.log(`NO SUCH NODE TO TRANSITION TO: ${dist.transition} FROM ${name}`);
            }
          })
        }
      })

      let out_transitions = ''
      Object.keys(transitions).forEach( (trans, index) => {
        let transitionClassName = className
        if(nodeHighlighted[trans] === 'standard'){
          transitionClassName = ''
        } else if(nodeHighlighted[trans] === 'highlighted'){
          transitionClassName='transition-highlighted'
        } else {
          transitionClassName='transition-muted'
        }
        if(selectedStateTransition === index){
          transitionClassName += ' transition-selected';
        }
        out_transitions += `${trans} [label = "${transitions[trans].join(',\\n')}", class = "transition transition-index_${index} ${transitionClassName}"]\n`
      })

      return out_transitions;

    }

    return ''

  }).join('')

}

const stateDescription = (state) =>{

  let details = ''

  switch(state['type']){
    case 'Initial':
    case 'Terminal':
      details = ''
      break;
    case 'Guard':
      details = "Allow if " + logicDetails(state['allow'])
      break;

    case 'Delay':
    case 'Death':
      if(state['range'] !== undefined){
        let r = state['range']
        details = `${r['low']} - ${r['high']} ${r['unit']}`
      } else if (state['exact'] !== undefined) {
        let e = state['exact']
        details = `${e['quantity']} ${e['unit']}`
      }
      break;
    case 'Encounter':
      if(state['wellness']){
        details = 'Wait for regularly scheduled wellness encounter\\n'
      }
      break;
    case 'EncounterEnd':
      details = 'End the current encounter'
      if(state['discharge_disposition']){
       let code = state['discharge_disposition']
       details += `\\lDischarge Disposition: [${code['code']}] ${code['display']}`
      }
      break;
    case 'SetAttribute':
      let v = state['value']
      details = `Set '${state["attribute"]}' = ${(v === undefined || v === null || v === "") ? 'nil' : v}`
      break;
    case 'Symptom':
     let s = state['symptom']
      if(state.range !== undefined){
        let r = state['range']
        details = `${s}: ${r['low']} - ${r['high']}`
      } else if (state.exact !== undefined) {
        let e = state['exact']
        details = `${s}: ${e['quantity']}`
      }
      break;
    case 'Observation':
      let unit = state['unit']
      if(unit){
        unit = "in " + unit.replace('{','(').replace('}',')')
      }

      if(state.vital_sign !== undefined) {
        details = `Record value from Vital Sign '${state["vital_sign"]}' ${unit}\\l`
      } else if (state.attribute !== undefined) {
        details = `Record value from Attribute '${state["attribute"]}' ${unit}\\l`
      } else if(state.range !== undefined){
        let r = state['range']
        details = `Record value between: ${r['low']} - ${r['high']} ${unit}\\l`
      } else if (state.exact !== undefined) {
        let e = state['exact']
        details = `Record value ${e['quantity']} ${unit}\\l`
      } else if (state.value_code !== undefined) {
        let v = state['value_code']
        details = `Record value ${v['system']}[${v['code']}]: ${v['display']}\\l`
      }
      break;
      
    case 'ImagingStudy':
      let series = state['series'];
      if (series.length > 0) {
        let primarySeries = series[0];
        let primaryModality = primarySeries['modality'];
        let primaryBodySite = primarySeries['body_site'];

        details = `DICOM-DCM[${primaryModality['code']}]: ${primaryModality['display']}\\l`
        details += `SNOMED-CT[${primaryBodySite['code']}]: Body Site: ${primaryBodySite['display']}\\l`
      }
      break;

    case 'Counter':
      details = `${state['action']} value of attribute '${state["attribute"]}' by 1`
      break;
    case 'VitalSign':
      let vs = state['vital_sign']
      let unitv = state['unit']
      if(state.range !== undefined){
        let r = state['range']
        details = `Set ${vs}: ${r['low']} - ${r['high']} ${unitv}`
      } else if (state.exact !== undefined) {
        let e = state['exact']
        details = `Set ${vs}: ${e['quantity']} ${unitv}`
      }
      break;
    case 'CallSubmodule':
      details = `Call submodule '${state['submodule']}'`
      break;
    case 'MultiObservation':
    case 'DiagnosticReport':
      if(state.observations && state.observations.length > 0){
        let diagType = ['Type']
        let diagValue = ['Value']
        let diagUnits = ['Unit'];
        state.observations.forEach( (s,i) => {
          let unit = s['unit']
          if(unit){
            unit = unit.replace('{','(').replace('}',')')
          }
          diagType.push(s.codes.map(c => c.display).join('\\l'))
          diagUnits.push(unit)

          if(s.vital_sign !== undefined) {
            diagValue.push(`Vital Sign: '${s["vital_sign"]}'`)
          } else if (s.attribute !== undefined) {
            diagValue.push(`Attribute: '${s["attribute"]}'`)
          } else if(s.range !== undefined){
            let r = s['range']
            diagValue.push(`${r['low']} - ${r['high']}`)
          } else if (s.exact !== undefined) {
            let e = s['exact']
            diagValue.push(`${e['quantity']}`);
          } else if (s.value_code !== undefined) {
            let v = s['value_code']
            diagValue.push(`${v['system']}[${v['code']}]: ${v['display']}`);
          }
        });
        details += `{${diagType.map(t => t).join('|')}}|`;
        details += `{${diagValue.map(t => t).join('|')}}|`;
        details += `{${diagUnits.map(t => t).join('|')}}|`;
      } else {
        details = `No Observations\\l`;
      }

      break;
    default:
      break;

  }

  if(state.codes !== undefined){
    state['codes'].forEach( code => {
      details = details + code['system'] + "[" + code['code'] + "]: " + code['display'] + "\\l"
    })
  }

  if(state.target_encounter !== undefined){
   let verb = 'Perform'

    switch(state['type']){
      case 'ConditionOnset':
      case 'AllergyOnset':
        verb = 'Diagnose'
        break;
      case 'MedicationOrder':
        verb = 'Prescribe'
        break;
      default:
        break;
    }

    details = details + verb + " at " + state['target_encounter'] + "\\l"
  }

  if(state.reason){
    details = details + `Reason: ${state['reason']}\\l`
  }
  if(state.medication_order){
    details = details + `Prescribed at: ${state['medication_order']}\\l`
  }
  if(state.condition_onset){
    details = details + `Onset at: ${state['condition_onset']}\\l`
  }
  if(state.allergy_onset){
    details = details + `Onset at: ${state['allergy_onset']}\\l`
  }
  if(state.careplan){
    details = details + `Prescribed at: ${state['careplan']}\\l`
  }
  if(state.assign_to_attribute){
    details = details + `Assign to Attribute: '${state['assign_to_attribute']}'\\l`
  }
  if(state.referenced_by_attribute){
    details = details + `Referenced By Attribute: '${state['referenced_by_attribute']}'\\l`
  }
  if(state.activities){
    details = details + "\\lActivities:\\l"
    state['activities'].forEach( activity => {
      details = details + activity['system'] + "[" + activity['code'] + "]: " + activity['display'] + "\\l"
    })
  }
  if(state.goals){
    details = details + "\\lGoals:\\l"
    state['goals'].forEach( goal => {
      if(goal['text']){
        details = details + goal['text'] + "\\l"
      } else if(goal['codes']) {
        let code = goal['codes'][0]
        details = details + code['system'] + "[" + code['code'] + "]: " + code['display'] + "\\l"
      } else if(goal['observation']) {
        let logic = goal['observation']
        let obs = findReferencedType(logic)
        details = details + `Observation ${obs} \\${logic['operator']}${leaveUndefinedBlank(logic['value'])}\\l`
      }
    })
  }
  if(state.duration){
    let d = state['duration']
    details = `${details}\\lDuration: ${d['low']} - ${d['high']} ${d['unit']}\\l`
  }
  if(state.category){
    details = `${details}Category: ${state['category']}\\l`
  }

  return details;
}

const logicDetails = logic => {

  switch(logic['condition_type']){
    case 'And':
    case 'Or':
      let subsWhen =logic['conditions'].map( c => {
        if(c['condition_type'] === 'and' || c['condition_type'] === 'or'){
          return "(\\l" + logicDetails(c) + ")\\l"
        } else {
          return logicDetails(c)
        }
      })
      return subsWhen.join(logic['condition_type'].toLowerCase() + ' ')
    case 'At Least':
    case 'At Most':
      let threshold = logic['minimum'] || logic['maximum']
      let subsOr = logic['conditions'].map( c => {
        if(c['condition_type'] === 'and' || c['condition_type'] === 'or'){
          return "(\\l" + logicDetails(c) + ")\\l"
        } else {
          return logicDetails(c)
        }
      });
      return `${logic['condition_type']} ${threshold} of:\\l- ${subsOr.join('- ')}`
    case 'Not':
      let condition = logicDetails(logic['condition'])
      return `not ${condition}`
    case 'Gender':
      return `gender is '${logic['gender']}'\\l`
    case 'Age':
      return `age \\${logic['operator']} ${logic['quantity']} ${logic['unit']}\\l`
    case 'Socioeconomic Status':
      return `${logic['category']} Socioeconomic Status\\l`
    case 'Race':
      return `race is '${logic['race']}'\\l`
    case 'Date':
      return `Year is \\${logic['operator']} ${logic['year']}\\l`
    case 'Symptom':
      return `Symptom: '${logic['symptom']}' \\${logic['operator']} ${logic['value']}\\l`
    case 'PriorState':
      let prior_description = `state '${logic['name']}' has been processed`
      if(logic.since !== undefined){
        prior_description = `${prior_description} since ${logic.since}`
      }
      if(logic.within !== undefined){
        prior_description = `${prior_description} within ${logic.within['quantity']} ${logic.within['unit']}`
      }
      return `${prior_description} \\l`
    case 'Attribute':
      return `Attribute: '${logic['attribute']}' \\${logic['operator']}${leaveUndefinedBlank(logic['value'])}\\l`
    case 'Observation':
      let obs = findReferencedType(logic)
      if (logic.operator !== 'is nil' && logic.operator !== 'is not nil' && logic.operator.id !== 'is nil' && logic.operator.id !== 'is not nil'){
        if(logic.value !== undefined){
          return `Observation ${obs} \\${logic['operator']}${leaveUndefinedBlank(logic['value'])}\\l`
        } else if (logic.value_code !== undefined) {
          return `Observation ${obs} \\${logic['operator']} ${logic.value_code['system']}[${logic.value_code['code']}]: ${logic.value_code['display']}\\l`
        }
      } else {
        return `Observation ${obs} \\${logic['operator']}\\l`
      }  
      
    case 'Vital Sign':
      return `Vital Sign ${logic['vital_sign']} \\${logic['operator']} ${logic['value']}\\l`
    case 'Active Condition':
      let cond = findReferencedType(logic)
      return `Condition ${cond} is active\\l`
    case 'Active CarePlan':
      let plan = findReferencedType(logic)
      return `CarePlan ${plan} is active\\l`
    case 'Active Medication':
      let med = findReferencedType(logic)
      return `Medication ${med} is active\\l`
    case 'Active Allergy':
      let alg = findReferencedType(logic)
      return `Allergy ${alg} is active\\l`
    case 'True':
    case 'False':
      return logic['condition_type']
    default:
      return `Unknown Condition: ${logic['condition_type']}`

  }
}

const findReferencedType = (logic) => {
  if(logic['codes']){
    let code = logic['codes'][0]
    return `'${code['system']} [${code['code']}]: ${code['display']}'`
  } else if (logic['referenced_by_attribute']) {
    return `Referenced By Attribute: '${logic['referenced_by_attribute']}'`
  }
  return `Error with referenced types: ${logic['condition_type']} condition must be specified by code or attribute`
}

const findTransitions = (obj, ret) => {

  if(!ret) ret = {};
  if (!obj) return ret;
  if (obj instanceof Array) {
    for (let i in obj) {
        ret = Object.assign({}, ret, findTransitions(obj[i], {}))
    }
    return ret;
  }

  if (obj['direct_transition']) ret[obj['direct_transition']] = true
  if (obj['transition']) ret[obj['transition']] = true;

  if ((typeof obj === "object") && (obj !== null) ){
    let children = Object.keys(obj);
    if (children.length > 0){
      for (let i = 0; i < children.length; i++ ){
        ret = Object.assign({}, ret,findTransitions(obj[children[i]], {}));
      }
    }
  }
  return ret;
}

const leaveUndefinedBlank = (value) => {
  if(value === undefined){
    return '';
  } else {
    return ' ' + value;
  }
}

const escapeId = (name) => {
  return cleanString(name, {'?': '', '"': ""});
};

const escapeName = (name) => {
  return  cleanString(name, {'"': '\\'});
};

const escapeLabel = (label) => {

  // note: order matters; in practice order is retained in browsers but we may want to make an array
  const mapObj = {
        "&" : "&amp;",
        "<" : "&lt;",
        ">" : "&gt;",
        '"' : '\\"',
        };

  return cleanString(label, mapObj);

}

