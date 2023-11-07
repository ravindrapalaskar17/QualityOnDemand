var dictionary = require('dictionary-en')
var nspell = require('nspell')
var exceptions = ['eventId', 'eventType', 'eventTime', 'eventSubscriptionId', 'publicAddress', 'subnet', 'privateAddress', 'publicPort', 'sessionId', 'UUID', 'devicePorts', 'QoS', 'qosProfile', 'TCP', 'UDP', 'QOS_S', 'QOS_M', 'QOS_L', 'QOS_E', 'webhook', 'notificationUrl', 'notificationAuthToken', 'startedAt', 'expiresAt', 'qosprofiles', 'minDuration', 'maxDuration', 'packetDelayBudget', 'oneway', 'endtoend', 'jitter', 'roundtrip', 'ITU', 'eg', 'realtime', 'packetErrorLossRate', 'QCI', 'maxDownstreamRate', 'QOS_STATUS_CHANGED', 'qosStatus', 'statusInfo', 'DURATION_EXPIRED', 'Enduser', 'IoT', 'sensorsactuators', 'phoneNumber', 'networkAccessIdentifier', 'MNO', 'invoker', 'MNOs', 'MSISDN', 'GPSI', 'IdentifierDomain', 'DNS', 'ie', 'applicationServerPorts', 'maxDownstreamBurstRate', 'maxUpstreamRate', 'QoD', 'cmunication', 'QualityOnDemand', 'Telco', 'indepth', 'Telecom', 'VRGaming', 'backend', 'OverviewhttpsrawgithubusercontentcomcamaraprojectQualityOnDemandmaindocumentationAPI_documentationresourcesQoD_latency_overviewPNG', 'QOD', 'OAuth', 'andor', 'AppFlow', 'portranges', 'AppFlows', 'portportranges', 'Appflow', 'br', 'APIhttpsrawgithubusercontentcomcamaraprojectQualityOnDemandmaindocumentationAPI_documentationresourcesQoD_detailsPNG', 'CAMARA', 'DRAFThttpsgithubcomcamaraprojectQualityOnDemandblobmaindocumentationAPI_documentationQoSProfile_Mapping_Tablemd', 'IETF', 'addressmask', 'applicationServer', 'dottedquad', 'sessionssessionId', 'createSession', 'targetMinUpstreamRate', 'SessionId', 'SessionInfo', 'EventNotification', 'PhoneNumber', 'QosStatus', 'EventQosStatus', 'ErrorInfo', 'GBR', 'latencysensitive', 'DOCSIS', 'maxUpstreamBurstRate', 'targetMinDownstreamRate', 'qosprofilesname', 'RateUnitEnum', 'CreateSession', 'PortsSpec', 'QosProfile', 'QosProfileName', 'TimeUnitEnum', 'QosProfileStatusEnum', 'EventId', 'EventType', 'EventTime', 'QosStatusChangedEvent', 'eventDetail', 'NETWORK_TERMINATED', 'StatusInfo', 'ApplicationServer', 'NetworkAccessIdentifier'];
var separatorsRegex = /\s/; 
var mistakes= [];

function includesNumber(value) {
    return /\d/.test(value);
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function (input) {
    dictionary ((err, dict) => {
        if (err) {
            throw err;
        }
        var spell = nspell(dict)
        var no_special_characters= input.replace(/[^\w\s]/gi, '')
        const words = no_special_characters.split(separatorsRegex);
        var errors= words
          .filter((word) => !exceptions.includes(word))
          .filter((word) => !spell.correct(word))
          .filter((word) => !word == '')
          .filter((word) => !includesNumber(word));

        if ((errors.length > 0) && (mistakes[mistakes.length-1] != errors[errors.length-1])) {
            mistakes.push(errors);
            errors = [];
            console.log("There was a spelling mistake: " + mistakes);
        }
    })
    sleep(150000).then(() => {return [{
      message: `Spelling mistakes found: ${mistakes.join(', ')}`,
    }];});
};
