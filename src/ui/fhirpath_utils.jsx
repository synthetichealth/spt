import fhirpath from 'fhirpath';
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';

// inspired by the Flexporter:
// https://github.com/synthetichealth/synthea/blob/master/src/main/java/org/mitre/synthea/export/flexporter/FhirPathUtils.java

/**
 * Execute the given FHIRPath against the given resource and return the results.
 *
 * @param resource FHIR resource to execute FHIRPath against
 * @param fhirpath FHIRPath string
 * @return Raw values from FHIRPath engine evaluating the string
 */
export function evaluateResource(resource, path, variables={}) {
  return fhirpath.evaluate(resource, path, variables, fhirpath_r4_model);
}

/**
 * Execute the given FHIRPath against the given Bundle and return the results. There are a few
 * different possibilities in how this works.
 * - If the FHIRPath string starts with "Bundle" then this will execute the FHIRPath once
 * against the Bundle as a whole, otherwise it will be executed against each resource.
 * - If "returnResources" is true, then resources from the Bundle
 * that return a truthy value will be returned, otherwise the raw value from the FHIRpath engine
 * will be returned.
 *
 * @param bundle FHIR bundle to evaluate FHIRpath against
 * @param fhirpath FHIRPath string
 * @param returnResources If true, return resources from bundle matching FHIRPath; if false,
 *     return raw values from FHIRPath engine
 * @return Differs based on input - see above
 */
export function evaluateBundle(bundle, fhirpath, variables, returnResources) {
  if (fhirpath.startsWith("Bundle")) {
    // run it on the entire bundle

    // NOTE: this doesn't check returnResources -- would that be useful here?
    return evaluateResource(bundle, fhirpath, variables);
  } else {
    // the fhirpath doesn't start with "Bundle"
    //  so we'll apply it to each resource within the bundle
    results = [];

    for (const entry of bundle.entry) {
      const resourceResults = evaluateResource(entry.resource, fhirpath);

      if (returnResources) {
        if (isTruthy(resourceResults)) {
          results.push(entry.resource);
        }
      } else {
        results.push(...resourceResults);
      }
    }

    return results;
  }
}



export function appliesToResource(resource, fhirpath) {
  return isTruthy(evaluateResource(resource, fhirpath));
}

export function appliesToBundle(bundle, fhirpath, variables) {
  return isTruthy(evaluateBundle(bundle, fhirpath, variables, false));
}

/**
 * Helper function to convert FHIRPath evaluation into a boolean.
 * Nulls, empty strings, and boolean false all mean "false" here. Everything else means "true".
 */
function isTruthy(result) {
  if (result == null) {
    return false;
  // } else if (result instanceof StringType) {
  //   StringType str = ((StringType) result);
  //   return !str.isEmpty() && !str.getValue().isEmpty();
  // } else if (result instanceof BooleanType) {
  //   BooleanType bool = ((BooleanType) result);
  //   return !bool.isEmpty() && bool.booleanValue();
  } else if (Array.isArray(result)) {
    return !!result.find(i => isTruthy(i));
  }

  return true;
}
