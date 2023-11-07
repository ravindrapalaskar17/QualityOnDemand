//import * as spellchecker from 'spellchecker'; // Import the spellchecker package
const spellChecker = require('spellchecker');
const exceptions = ['eventId', 'eventType', 'eventTime', 'eventSubscriptionId', 'publicAddress', 'subnet', 'privateAddress', 'publicPort', 'sessionId', 'UUID', 'devicePorts', 'QoS', 'qosProfile', 'TCP', 'UDP', 'QOS_S', 'QOS_M', 'QOS_L', 'QOS_E', 'webhook', 'notificationUrl', 'notificationAuthToken', 'startedAt', 'expiresAt', 'qosprofiles', 'minDuration', 'maxDuration', 'packetDelayBudget', 'oneway', 'endtoend', 'jitter', 'roundtrip', 'ITU', 'eg', 'realtime', 'packetErrorLossRate', 'QCI', 'maxDownstreamRate', 'QOS_STATUS_CHANGED', 'qosStatus', 'statusInfo', 'DURATION_EXPIRED', 'Enduser', 'IoT', 'sensorsactuators', 'phoneNumber', 'networkAccessIdentifier', 'MNO', 'invoker', 'MNOs', 'MSISDN', 'GPSI', 'IdentifierDomain', 'DNS', 'ie', 'applicationServerPorts', 'maxDownstreamBurstRate', 'maxUpstreamRate', 'QoD', 'cmunication', 'QualityOnDemand', 'Telco', 'indepth', 'Telecom', 'VRGaming', 'backend', 'OverviewhttpsrawgithubusercontentcomcamaraprojectQualityOnDemandmaindocumentationAPI_documentationresourcesQoD_latency_overviewPNG', 'QOD', 'OAuth', 'andor', 'AppFlow', 'portranges', 'AppFlows', 'portportranges', 'Appflow', 'br', 'APIhttpsrawgithubusercontentcomcamaraprojectQualityOnDemandmaindocumentationAPI_documentationresourcesQoD_detailsPNG', 'CAMARA', 'DRAFThttpsgithubcomcamaraprojectQualityOnDemandblobmaindocumentationAPI_documentationQoSProfile_Mapping_Tablemd', 'IETF', 'addressmask', 'applicationServer', 'dottedquad', 'sessionssessionId', 'createSession', 'targetMinUpstreamRate', 'SessionId', 'SessionInfo', 'EventNotification', 'PhoneNumber', 'QosStatus', 'EventQosStatus', 'ErrorInfo', 'GBR', 'latencysensitive', 'DOCSIS', 'maxUpstreamBurstRate', 'targetMinDownstreamRate', 'qosprofilesname', 'RateUnitEnum', 'CreateSession', 'PortsSpec', 'QosProfile', 'QosProfileName', 'TimeUnitEnum', 'QosProfileStatusEnum', 'EventId', 'EventType', 'EventTime', 'QosStatusChangedEvent', 'eventDetail', 'NETWORK_TERMINATED', 'StatusInfo', 'ApplicationServer', 'NetworkAccessIdentifier'];


// Load the dictionary
const dictionaryEn = require('dictionary-en');

// Convert the dictionary to an array (example)
const dictionary = dictionaryEn.sync(); // Replace with your actual dictionary source

export default (input) => {
  const words = input.split(/[_]/); // Split input based on underscores
  const mistakes = words
    .filter((word) => !exceptions.includes(word))
    .filter((word) => !isInDictionary(word, dictionary));

  if (mistakes.length > 0) {
    return [{
      message: `Spelling mistakes found: ${mistakes.join(', ')}`,
    }];
  }
};

function isInDictionary(word, dictionary) {
  return dictionary.includes(word.toLowerCase()); // Check if the lowercase version of the word is in the dictionary
}
