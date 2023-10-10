const fs = require('fs');
const dictionary = require('dictionary-en');
const nspell = require('nspell');

// List of exceptions (words that should not be considered as spelling mistakes)
const exceptions = [
  'API','MACE','eventId', 'eventType', 'eventTime', 'eventSubscriptionId', 'publicAddress', 
  'subnet', 'privateAddress', 'publicPort', 'sessionId', 'UUID', 'devicePorts', 'QoS', 'qosProfile', 
  'TCP', 'UDP', 'QOS_S', 'QOS_M', 'QOS_L', 'QOS_E', 'webhook', 'notificationUrl', 'notificationAuthToken', 
  'startedAt', 'expiresAt', 'qosprofiles', 'minDuration', 'maxDuration', 'packetDelayBudget', 'oneway', 
  'endtoend', 'jitter', 'roundtrip', 'ITU', 'eg', 'realtime', 'packetErrorLossRate', 'QCI', 'maxDownstreamRate', 
  'QOS_STATUS_CHANGED', 'qosStatus', 'statusInfo', 'DURATION_EXPIRED', 'Enduser', 'IoT', 'sensorsactuators', 
  'phoneNumber', 'networkAccessIdentifier', 'MNO', 'invoker', 'MNOs', 'MSISDN', 'GPSI', 'IdentifierDomain', 
  'DNS', 'ie', 'applicationServerPorts', 'maxDownstreamBurstRate', 'maxUpstreamRate', 'QoD', 'cmunication', 
  'QualityOnDemand', 'Telco', 'indepth', 'Telecom', 'VRGaming', 'backend',
  'OverviewhttpsrawgithubusercontentcomcamaraprojectQualityOnDemandmaindocumentationAPI_documentationresourcesQoD_latency_overviewPNG', 'QOD', 
  'OAuth', 'andor', 'AppFlow', 'portranges', 'AppFlows', 'portportranges', 'Appflow', 'br', 
  'APIhttpsrawgithubusercontentcomcamaraprojectQualityOnDemandmaindocumentationAPI_documentationresourcesQoD_detailsPNG', 
  'CAMARA', 'DRAFThttpsgithubcomcamaraprojectQualityOnDemandblobmaindocumentationAPI_documentationQoSProfile_Mapping_Tablemd', 
  'IETF', 'addressmask', 'applicationServer', 'dottedquad', 'sessionssessionId', 'createSession', 'targetMinUpstreamRate', 
  'SessionId', 'SessionInfo', 'EventNotification', 'PhoneNumber', 'QosStatus', 'EventQosStatus', 'ErrorInfo', 'GBR', 'latencysensitive', 
  'DOCSIS', 'maxUpstreamBurstRate', 'targetMinDownstreamRate', 'qosprofilesname', 'RateUnitEnum', 'CreateSession', 'PortsSpec', 'QosProfile', 
  'QosProfileName', 'TimeUnitEnum', 'QosProfileStatusEnum', 'EventId', 'EventType', 'EventTime', 'QosStatusChangedEvent', 'eventDetail', 
  'NETWORK_TERMINATED', 'StatusInfo', 'ApplicationServer', 'NetworkAccessIdentifier'];

// Regular expression to split text into words (space, newline, etc.)
const separatorsRegex = /\s+/;

// Function to check if a word includes a number
function includesNumber(word) {
  return /\d/.test(word);
}

// Function to find spelling mistakes in a file
function findSpellingMistakesInFile(filePath) {
  try {
    // Read the content of the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Initialize the dictionary
    dictionary((err, dict) => {
      if (err) {
        throw err;
      }

      // Initialize the spell checker
      const spell = nspell(dict);

      // Split the content into words
      const words = fileContent.split(separatorsRegex);

      // Filter out exceptions and spelling mistakes
      const mistakes = words
        .filter((word) => !exceptions.includes(word.toLowerCase()))
        .filter((word) => !spell.correct(word))
        .filter((word) => word !== '')
        .filter((word) => !includesNumber(word));

      if (mistakes.length > 0) {
        console.log('Spelling mistakes found:');
        console.log(mistakes);
      } else {
        console.log('No spelling mistakes found.');
      }
    });
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Example usage:
const filePath = 'code/API_definitions/qod-api.yaml';
findSpellingMistakesInFile(filePath);
