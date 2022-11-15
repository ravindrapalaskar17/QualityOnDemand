# Overview

<span class="colour" style="color:rgb(0, 0, 0)">The Quality-On-Demand API provides programmable interface for developers and other users (capabilities consumers) to specify stable data-transfer throughput/latency managed by Telco networks, without necessity to have in-depth knowledge of the 4G/5G system complexity by abstracting the internal complexity of telecom systems [1].</span>

## 1\. Introduction

Industrial (IoT), VR/Gaming, broadcasting, autonomous driving and many others scenarios demand network communication quality and are sensitive to any change in transmission conditions. Being able to request a stable bandwidth/latency from the network can improve user experience.. 

The QoD  API offers the application developers and users the capability to request for stable throughput/latency for a specified App-Flow between User Equipment (application clients) and Application Services (backend services). The developer has a pre-defined set of QoS_Profiles which he could choose from depending on his throughput/latency requirements. 

<img src="./resources/QoD_overview.PNG" alt="QoD_BM" title="QoD Bandwidth API Overview">


## 2\. Quick Start

The usage of QOD(Quality on Demand) API is based on QoS sessions, which can be created (based on available QoS profiles), queried and deleted.
The deletion of a requested session can be triggered by the user or can be triggered automatically. The automatic process is triggered either when the user specified duration has reached its limit, or default session expiration time has been reached (within reference implementation set to 24hrs). 

Before starting to use the API, the developer needs to know about the below specified details:

**Base URL**
The RESTful QOD (Quality on Demand) API endpoint.

**Authentication**
Configure security access keys such as OAuth 2.0 client credentials to be used by Client applications which will invoke the QoD API.

**QoS Profile**
Define throughput/latency requirements of the application and identify QoS profile class which maps into the required performance category.

**App-Flow**
Describes the precise flow the developer wants to prioritize and have stable bandwidth/latency. This flow is described using UE-identifier (IP address, msisdn or external ID), the application server identifier (IP address) and ports.

**Duration**
Define the number of seconds for which the QoD session should be created. This parameter is optional and if not specified, the session is either deleted on user request or if default expiration limit has been reached (24 hours in reference implementation).

**Notification URL and token**
Developers have a chance to specify callback URL on which notifications (eg. session termination) regarding the session can be received from the service provider. This is also an optional parameter.

Sample API invocations are presented in Section 4.5.

## 3\. Authentication and Authorization

The QoD Service API makes use of the client credentials grant which is applicable for server to server use cases involving trusted partners or clients without any protected user data involved.
In this method the API invoker client is registered as a confidential client with an authorization grant type of client\_credentials [3].

## 4\. API Documentation

### 4.1 Details
The usage of the QoD(Quality on Demand) API is based on QoS profile classes and parameters which define App-Flows.
Based on the API, QoS sessions can be created, queried, and deleted.The QoD API has the following characteristics:
* A specified App-Flow is prioritized to ensure stable throughput/latency for that flow
* The prioritized App-Flow is described by providing additional information such as  ports. 
* Stable bandwidth is requested by selecting from the list of QoS profiles made available by the service provider (e.g. Small ,Medium, Large) to map throughput requirements and  stable latency is requested by Selecting  QOS\E profile.
* The developer can optionally specify the duration for which he needs the prioritized App-flow
* The developer can optionally also specify callback URL on which notifications for the session can be sent
<br>
Following diagram shows the interaction between different components 

<br />
<img src="./resources/QoD_details.PNG" alt="QoD_BM" title="QoD Bandwidth Management"> 

The below table shows sample QoS profiles and are subject to service provider customizations. This sample is taken from the agreed sample (example) set from the Camara-project [2].

| **QoD throughput profile** | **Details** |
|----------------------------| ------- |
| *`QOS\_E`*                 | Latency stays stable under congestion (throughput upto 2Mbps) Qualifier for enhanced communication profile| 
| *`QOS\_S`*                 | Small class of throughput profile - for example DL (Downlink) up-to 10Mbps |
| *`QOS\_M`*                 | Medium class of throughput profile - for example DL (Downlink) up-to 30Mbps |
| *`QOS\_L`*                 | Large class of throughput profile - for example DL (Downlink) up-to 100Mbps |

### 4.2 Endpoint Definitions

<span class="colour" style="color:rgb(23, 43, 77)"><span class="colour" style="color:rgb(36, 41, 47)">Following table defines API endpoints of exposed REST based for QoD throughput management operations. </span></span>

| **Endpoint** | **Operation**         | **Description** |
| -------- |-----------------------| ----------- |
| POST<br>  \<base-url>/qod/v0/sessions | **Create Session**    | Creates a new QoS session on demand |
| GET<br> \<base-url>/qod/v0/sessions/{sessionId} | **Query for Session** | Get session information |
| DELETE<br> \<base-url>/qod/v0/sessions/{sessionId} | **Delete  Session**   | Deleting a QoS session |
<br>

#### QoD (Quality on Demand) Create QoS Session Operation

| **Create QoS session**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **HTTP Request**<br> POST \<base-url>/qod/v0/sessions<br>**Query Parameters**<br> No query parameters are defined.<br>**Path Parameters**<br> No path parameters are defined.<br>**Request Body Parameters**<br> **duration (optional)**: Session duration in seconds. Maximal value of 24 hours is used if not set.<br> **ueId:** [**external Id,msisdn, ipv4addr,ipv6addr**]<br>**1.ExternalId** : - This field will Decided by customer at present we kept as E-mail Id format Eg. 123456789@domain.com<br>**2. Msisdn** : - for eg:- 123456789.<br> **3.IPv4 address(ipv4addr)** of the user equipment. It can contain a single IP address or a range, using a mask.<br>  Format: \<address>[/\<mask>]<br>   - address : an IPv4 number in dotted-quad form 1.2.3.4. Only this exact IP number will match the flow control rule.<br>   - address/mask : an IP number as above with a mask width of the form 1.2.3.4/24.<br>    *In this case, all IP numbers from 1.2.3.0 to 1.2.3.255 will match. The bit width MUST be valid for the IP  version.* <br>**4.Ipv6 Address(ipv6addr)** :- IPv6 address, following IETF 5952 format, may be specified in form <address/mask> as:  - address - The /128 subnet is optional for single addresses:   - -2001:db8:85a3:8d3:1319:8a2e:370:7344<br>  - 2001:db8:85a3:8d3:1319:8a2e:370:7344/128<br> - address/mask - an IP v6 number with a mask:<br>- 2001:db8:85a3:8d3::0/64<br>- 2001:db8:85a3:8d3::/64 <br> **asId: [ipv4addr or ipv6addr]** <br>The IPv4/IPv6 address of the application server. It can contain a single IP address or a range, using a mask.<br> <br> **uePorts (optional):** A list of single ports or port ranges on the user equipment.<br>   The '-' notation specifies a range of ports (including boundaries).<br>   Example: '5010-5020'<br> **asPorts (optional):** A list of single ports or port ranges on the application server.<br>Example:-'5060-5070'<br> **qos:** Qualifier for the requested throughput/latency profile (QoS values based on example mapping and might differ in production networks).<br>   `QOS_E` - Qualifier for enhanced communication profile <br> `QOS_S` - Qualifier for the requested QoS profile _S_<br>  `QOS_M` - Qualifier for the requested QoS profile _M_<br>`QOS_L` - Qualifier for the requested QoS profile _L_ <br> **notificationUri (optional):** URI of the callback receiver. Allows asynchronous delivery of session related events<br>Example: [<span class="s2">https://application-server.com/notifications</span>](https://application-server.com/notifications) <br> **notificationAuthToken (optional):** Authentification token for callback API.<br>  Example: 'c8974e592c2fa383d4a3960714'<br><br>**Response**<br> **201: Session created**<br>  Response body:<br>   **duration:** Session duration in seconds.<br>   **ueAddr:** (IP address,externalID,msisdn) of the user equipment.<br>   **asAddr:** The IP address(ipv4addr or ipv6addr) of the application server.<br>   **uePorts (optional):** The requested port(s) on the user equipment.<br>   **asPorts (optional):** The requested port(s) on the application server.<br>  **qos:** QoS qualifier of the requested throughput/latency profile.<br>   **notificationUri (optional):** URI of the callback receiver.<br>   **notificationAuthToken (optional):** Authentication token for callback API.<br>   **id:** Session ID in UUID format.<br>  Example: 123e4567-e89b-12d3-a456-426614174000<br>   **startedAt:** Timestamp of session start, in seconds since unix epoch.<br>    Example: 1639479600<br>   **expiresAt**: Timestamp of session expiration if the session was not deleted, in seconds since unix epoch.<br><br>**400:** **INVALID_INPUT** : "Expected Property is Missing(externalId,msisdn,ipv4addr,ipv6addr)"<br> **401:** **UNAUTHORIZED**:  "missing or incorrect authentication.<br> **403:** **FORBIDDEN** :"Operation not allowed" <br>  **409:** **CONFLICT** :  "Another Session is created for same UE"<br> **500:** **INTERNAL** : "Session could not be created"<br> **503:** **SERVICE_UNAVAILABLE**: "service Unavailable" |
<br>

#### QoD Query for QoS Session

| **Quering QoS session  information**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **HTTP Request**<br> GET\<base-url>/qod/v0/sessions/{sessionId}<br>**Query Parameters**<br> No query parameters are defined.<br>**Path Parameters**<br> sessionId: Session id that was obtained from the Create QoS Session operation.<br>**Request Body Parameters**<br> No request body parameters are defined.<br>**Response**<br><br> **200: Session information returned.**<br>  Response body:<br>   **duration:** Session duration in seconds.<br>   **ueId:** (IP address,externalID,msisdn) of the user equipment.<br>   **asId:**  The IP address(ipv4addr or ipv6addr) of the application server.<br>   **uePorts (optional):** The requested port(s) on the user equipment.<br>   **asPorts (optional):** The requested port(s) on the application server.<br>     **qos:** Qualifier of the requested throughput/latency profile.<br>   **notificationUri (optional):** URI of the callback receiver.<br>   **notificationAuthToken (optional):** Authentication token for callback API.<br>   **id:** Session ID in UUID format.<br>   **startedAt:** Timestamp of session start in seconds since unix epoch.<br>   **expiresAt:** Timestamp of session expiration if the session was not deleted in seconds since unix epoch.<br><br> **401: UNAUTHORIZED:** "missing or incorrect authentication".<br> **403 : FORBIDDEN :** "Operation not allowed" <br> **404: NOT_FOUND** "Session  id does not exist".<br> **503: SERVICE_UNAVAILABLE** "service Unavailable" |

#### QoD Delete  QoS Session

| **Deleting QoS session**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **HTTP Request**<br>  DELETE\<base-url>/qod/api/v0/sessions/{sessionId}<br>**Query Parameters**<br>  No query parameters are defined.<br>**Path Parameters**<br>  sessionId: Session ID that need to terminated.<br>**Request Body Parameters**<br>  No request body parameters are defined.<br><br>**Response**<br> **204: NO CONTENT** "Session deleted"<br> **401:UNAUTHORIZED** "missing or incorrect authentication".<br>**403:FORBIDDEN** "Operation not allowed"<br> **404: NOT_FOUND**  "Session id does not exist".<br>**503: SERVICE_UNAVAILABLE** "service Unavailable" |

### 4.3 Errors

Since CAMARA QoD API is based on REST design principles and blueprints, well defined HTTP status
codes and families specified by community are followed [4].

Details of HTTP based error/exception codes for the QoD API are described in Section 4.2 of each API REST based method.
Following table provides an overview of common error names, codes and messages applicable to QoD API.

| No  | HTTP Status Code | Error Code          | Error Message                                                  |
|-----|------------------|---------------------|----------------------------------------------------------------|
| 1   | 400              | INVALID_INPUT       | "Expected property is missing: ueId.msisdn"                    |
| 2   | 400              | INVALID_INPUT       | "Expected property is missing: ueId.ipv4addr"                  |
| 3   | 400              | INVALID_INPUT       | "Expected property is missing: ueId.ipv4addr or ueId.ipv6addr" |
| 4   | 400              | INVALID_INPUT       | "Expected property is missing: uePorts"                        |
| 5   | 400              | INVALID_INPUT       | "Expected property is missing: qos"                            |
| 6   | 400              | INVALID_INPUT       | "Ranges not allowed: uePorts"                                  |
| 7   | 401              | UNAUTHORIZED        | "Authorization to invoke operation"                            |
| 8   | 403              | FORBIDDEN           | "Operation not allowed"                                        |
| 9   | 404              | NOT_FOUND           | "Session Id does not exist"                                    |
| 10  | 409              | CONFLICT            | "Another session is created for the same UE"                   |
| 11  | 500              | INTERNAL            | "Session could not be created"                                 |
| 12  | 503              | SERVICE_UNAVAILABLE | "Service unavailable"                                          |


### 4.4 Policies

N/A

### 4.5 Code Snippets

<span class="colour" style="color:rgb(36, 41, 47)">Snippet 1, elaborates REST based API call with "*curl"* to create a QoS session for sample streaming service with following parameters: </span>

* QoS session with 1H duration and QoS-profile "L" mapping,
* App-Flow is specified for  UE-Terminal (min 1 parameter) ueId:{ [ external id : "123456789@domain.com",  msisdn:"123456789,  ipv4addr : "192.168.0.0/24" , ipv6addr : "2001 : db8 : 85a3 : 8d3 : 1319 : 8a2e : 370 : 7344 "] } , Application server network asId = { [ ipv4addr:"192.170.20.0/24" , ipv6addr : " 2001 : db8: 3333 : 4444 : 5555 : 6666 : 7777 : 8888" ] } and Port number (asPorts=ranges from 5010 to 5020).

Please note, the credentials for API authentication purposes need to be adjusted based on target security system configuration.

| Snippet 1. Create QoS session                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| curl -X 'POST' `https://sample-base-url/qod/api/v0/sessions`   <br>    -H 'accept: application/json' <br>    -H 'Content-Type: application/json'<br>    -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbG...."<br>    { <br>  .."duration": 50,<br>   .."ueId": { <br>  ....."externalID": "123456789@Domain.com",<br> ....."msisdn": "123456789",<br>....."ipv4addr": "192.168.0.0/24" <br>..... "ipv6addr":"2001:db8:85a3:8d3:1319:8a2e:370:7344"<br>....} ,   <br> .. "asId": { <br>....."ipv4addr":  "192.170.20.0/24",<br>.....ipv6addr:"2001 : db8: 3333 : 4444 : 5555 : 6666 : 7777 : 8888" <br> ...} , <br>     .."asPorts": { <br>....."ranges" : [ <br> ........{<br>..............."from" : "5010",<br>................"to" : "5020"<br>........}<br>....]<br>...} ,<br/>     "qos": "QOS\_L",<br>     "notificationUri": `https://your-callback-server.com/notifications` ,<br>     "notificationAuthToken": "c8974e592c2fa383d4a3960714"<br>   }' |
<br>
Snippet 2, elaborates sample QoS notification "SESSION_TERMINATION" message distributed from QoD backend to client callback function.

| Snippet 2. Sample QoS session notification |
| ------------------------------------------ |
| <span style="-webkit-font-smoothing: antialiased; box-sizing: border-box;">{<br>&nbsp; &nbsp;"sessionId":&nbsp;</span><span style="-webkit-font-smoothing: antialiased; box-sizing: border-box; font-style: inherit; font-weight: inherit;">"3fa85f64-5717-4562-b3fc-2c963f66afa6"</span><span style="-webkit-font-smoothing: antialiased; box-sizing: border-box;">,&nbsp;</span><span style="-webkit-font-smoothing: antialiased; box-sizing: border-box;">&nbsp; &nbsp;&nbsp;</span><span style="-webkit-font-smoothing: antialiased; box-sizing: border-box;">"event":&nbsp;</span><span style="-webkit-font-smoothing: antialiased; box-sizing: border-box; font-style: inherit; font-weight: inherit;">"SESSION\_TERMINATED"</span><span style="-webkit-font-smoothing: antialiased; box-sizing: border-box; font-style: inherit; font-weight: inherit;"></span><span style="-webkit-font-smoothing: antialiased; box-sizing: border-box; font-style: inherit; font-weight: inherit;"></span><span style="-webkit-font-smoothing: antialiased; box-sizing: border-box; font-style: inherit; font-weight: inherit;"></span><span style="-webkit-font-smoothing: antialiased; box-sizing: border-box; font-style: inherit; font-weight: inherit;"></span><span style="-webkit-font-smoothing: antialiased; box-sizing: border-box;"></span>} |

### 4.6 FAQ's

(FAQs will be added in a later version of the documentation)

### 4.7 Terms

N/A

### 4.8 Release Notes

N/A

## References

[1] 3GPP TS 23.501: System architecture for the 5G System (5GS); Stage 2 (Release 17), V17.4.0 (2022-03)<br>
[2] Camara QoS/QCI mapping table https://github.com/camaraproject/QualityOnDemand/blob/main/code/API_definitions/QoSProfile_Mapping_Table.md <br>
[3] Camara Commonalities : Authentication and Authorization Concept for Service APIs https://github.com/camaraproject/WorkingGroups/blob/main/Commonalities/documentation/Working/CAMARA-AuthN-AuthZ-Concept.md <br>
[4] HTTP Status codes spec https://restfulapi.net/http-status-codes
