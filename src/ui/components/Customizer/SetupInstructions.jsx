import React, { memo, useState, Fragment } from 'react';
import { Button, Switch } from '@mui/material';

import DockerfileBuilder from './DockerfileBuilder';

import { renderArgs } from './ArgBuilder';
import { buildConfigFile } from './ConfigFileBuilder';
import { BashCodeBlock } from './BashCodeBlock';

import { saveFile } from './utils';


// props = args, config, configAsArgs, keepModuleString
const SetupInstructions = props => {
  const { mode } = props;

  if (mode === "basic") {
    return <BasicSetupInstructions {...props} />
  } else if (mode === "developer") {
    return <DeveloperSetupInstructions {...props} />
  } else if (mode === "docker") {
    return <DockerInstructions {...props} />
  }
}


const BasicSetupInstructions = props => {
  const { args, config, configAsArgs, keepModuleString } = props;

  const myArgs = JSON.parse(JSON.stringify(args)); // deep copy


  if (keepModuleString) {
    myArgs['keepModule'] = 'keep.json';
  }

  const configFileString = buildConfigFile(config);
  if (configAsArgs && configFileString) {
    myArgs['configFile'] = 'custom.properties';
  } 

  return (<div>
<h3>Basic Setup</h3>
    For users who just want to run Synthea, and not make detailed changes
    to the internal models, the basic setup is recommended.<br/>
    However, the number of customizations available in this setup is limited. 
    See the Developer Setup for instructions if you want to make changes 
    to the internals of Synthea.
<br /><br />
<h5>Prerequisites</h5>
    Some familiarity with the command-line is expected
     (ability to navigate between folders and run commands).<br/>
    Synthea requires the Java™ JDK 11 or newer to be installed 
    (make sure to select the JDK, not the JRE install).
    We recommend the prebuilt OpenJDK binaries available from 
    <a href="https://adoptium.net/" target="_blank">https://adoptium.net/</a>.
<br /><br />
<h5>Setup</h5>
    Download the binary distribution to a file from&nbsp;
    <a href="https://github.com/synthetichealth/synthea/releases/download/master-branch-latest/synthea-with-dependencies.jar" target="_blank">
    https://github.com/synthetichealth/synthea/releases/download/master-branch-latest/synthea-with-dependencies.jar</a>.
    This guide assumes the name is left as the default:&nbsp;
    <code>synthea-with-dependencies.jar</code>.

    { keepModuleString && (<div>
    Download the Keep Module to the same synthea folder: <Button variant="outlined" onClick={() => saveFile(keepModuleString, 'keep.json')} style={{textTransform: "none"}}>Download Keep Module</Button>
  </div>) }

<br /><br />
<h5>Running</h5>
    Open a command-line prompt/terminal window and run Synthea 
    by running the command below with your specified configuration as arguments:
    <br/>
    <BashCodeBlock code={renderArgs('java -jar synthea-with-dependencies.jar', myArgs, config)} />
    <br />

</div>);
}

const DeveloperSetupInstructions = props => {
  const { args, config, configAsArgs, keepModuleString } = props;

  const myArgs = JSON.parse(JSON.stringify(args)); // deep copy
  if (keepModuleString) {
    myArgs['keepModule'] = 'keep.json';
  }

  const configFileString = buildConfigFile(config);
  if (configAsArgs && configFileString) {
    myArgs['configFile'] = 'custom.properties';
  } 

  const [isWindows, setIsWindows] = useState(false);

  return (<div>
<h3>Developer Setup</h3>
    These instructions are intended for those wishing to examine the Synthea source code, extend it or build the code locally. 
    The developer setup is not necessary for all customizations, but using this setup enables many which cannot be used via the basic setup.
<br /><br />
<h5>Prerequisites</h5>
    Synthea requires the Java™ JDK 11 or newer to be installed (make sure to select the JDK, not the JRE install).
    We recommend the prebuilt OpenJDK binaries available from <a href="https://adoptium.net/" target="_blank">https://adoptium.net/</a>.
    <br/>
    <a href="https://git-scm.com/" target="_blank">Git</a> is also required for the developer setup.
<br /><br />
<h5>Setup</h5>

   Running on Mac/Linux <Switch onChange={e => setIsWindows(e.target.checked)} /> Running on Windows <br />


To copy the repository locally, install the necessary dependencies, and run the full test suite, open a terminal window and run the following commands:
<br/>
<BashCodeBlock code={`git clone https://github.com/synthetichealth/synthea.git
cd synthea
${ isWindows ? '.\\gradlew.bat build check' : './gradlew build check' }`} />
<br/>

  { keepModuleString && (<div>
    Download the Keep Module to the same synthea folder: <Button variant="outlined" onClick={() => saveFile(keepModuleString, 'keep.json')} style={{textTransform: "none"}}>Download Keep Module</Button>
  </div>) }

<br /><br />
<h5>Running</h5>

To run Synthea with your desired settings, use the <code>run_synthea</code> script and provide your specified configuration as arguments:

<BashCodeBlock code={renderArgs(isWindows ? '.\\run_synthea.bat' : './run_synthea', myArgs, config)} />
<br /><br />


When you run this command, you should see output similar to the following:</div>);
}

// For Docker, everything is packaged together into just the dockerfile
const DockerInstructions = props => {

  return (<div>
<h3>Docker Setup</h3>
    For users who just want to run Synthea, and not make detailed changes to the internal models, the basic setup is recommended.
    However, the number of customizations available in this setup is limited. See the Developer Setup for instructions if you want to make changes to the internals of Synthea.
<br /><br />
<h5>Prerequisites</h5>
    Windows and Mac users will need to install <a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker Desktop</a>. <br/>
    Linux users should follow the instructions for their distribution to install the <a href="https://docs.docker.com/engine/install/" target="_blank">Docker Engine</a>.
<br /><br />
<h5>Setup & Running</h5>
    <DockerfileBuilder {...props} />

    </div>);
}

export default memo(SetupInstructions);
