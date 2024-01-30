#-
# ---license-start
# CAMARA Project
# ---
# Copyright (C) 2022 - 2023 Contributors | Deutsche Telekom AG to CAMARA a Series
#
# The contributor of this file confirms his sign-off for the
# Developer Certificate of Origin
#             (http://developercertificate.org).
# ---
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ---license-end

@QoDSenf @DevTest @QoDSanity
Feature: Automated QoD Senf System Integration Test

  @QoDSessionCreateGetDelete
  Scenario: Create QoD session, get QoD session and delete QoD Session
    Given Use the QOD BaseURL
    When Create a new QoD session with mandatory parameters
    Then successful operation expecting response body with code 201
    When Delete QoD session
    Then Response code is 204
    When Create a new QoD session with all parameters
    Then successful operation expecting response body with code 201
    When Get QoD session
    Then successful operation expecting response body with code 200
    When Delete QoD session
    Then Response code is 204


  @QoDNotificationTest
  Scenario: QoD notification test
    Given Use the QOD BaseURL
    When Create a new QoD session with a valid callback application URL
    Then Response code is 201
    And The callback application receives QOS_STATUS_CHANGED event

  @QoDNotificationDeleteTest
  Scenario: QoD notification Create session  Delete session test
    Given Use the QOD BaseURL
    When Create a new QoD session with a valid callback application URL
    Then Response code is 201
    When Delete QoD session
    Then Response code is 204
    When Create a new QoD session with a valid callback application URL
    Then Response code is 201
    And The callback application receives QOS_STATUS_CHANGED event


### @QoDNotificationNewTest commenting as not reproducible using node-red mock
  ##Scenario: QoD notification test with new session creation after default duration
    ##Given Use the BaseURL
    ##When Create a new QoD session with a valid callback application URL
    ##Then Response code is 201
    ##And The callback application receives QOS_STATUS_CHANGED event
    ##When Create a new QoD session with a valid callback application URL
    ##Then Response code is 201

  @QoDInvalidGetSession
  Scenario: Get a QoD session for an unknown / expired session id
    Given Use the QOD BaseURL
    When Create a new QoD session for an unknown or expired session id
    Then Response code is 404
    Then Response in message is QoD session not found

  @QoDInvalidCreateSession
  Scenario: QoD session for an invalid payload
    Given Use the QOD BaseURL

    # Test with missing ueId Ip address
    When Create a new QoD session with ueId Ip address in json payload
    Then Response code is 400

    # Test with missing double quote in json payload
    When Create a new QoD session with missing double quote in json payload
    Then Response code is 400

    # Test with missing bracket in json payload
    When Create a new QoD session with missing bracket in json payload
    Then Response code is 400

    # Test with a wrong msisdn
    When Create a new QoD session with incorrect msisdn in json payload
    Then Response code is 400

    #Test with a wrong ip address
    When Create a new QoD session with incorrect ipaddress in json payload
    Then Response code is 400

    # Test with missing "qos" in json payload
    When Create a new QoD session with missing "qos" in json payload
    Then Response code is 400

    # Test creating an already existing session
    When Create a new QoD session with msisdn that is already in use
    Then Response code is 409

  @QoDInvalidDeleteSession
  Scenario: Delete unknown QoD Session
    Given Use the QOD BaseURL

    #Test for invalid sessionID
    When Create a new QoD session for an unknown or expired session id
    Then Response code is 404

  @ForbiddenOperation
  Scenario: A forbidden put Operation
    Given Use the QOD BaseURL

    # Test for when a Put Operation is tried
    When Put Operation is tried
    Then Response code is 405

  @QoDServiceUnavailable
  Scenario: Internal Server Issue e.g. Service offline
    Given Use the QOD BaseURL

    # Test for Create when service unavailable
    When Create a Qod Session when the service is unavailable
    Then Response code is not 503

    # Test for Get when service unavailable
    When Get a Qod Session when the service is unavailable
    Then Response code is not 503

    # Test for Delete when service unavailable
    When Delete a Qod Session when the service is unavailable
    Then Response code is not 503

#Commenting as there is open bug
  #@QoDSessionCreateDuration
  #Scenario: Create QoD session with duration as null
    #Given Use the BaseURL
    #When Create a new QoD session with all parameters with duration as blank
    #Then Response code is 400

  @QoDSessionQosProfile
  Scenario: Create QoD session with Incorrect QOS profile
    Given Use the QOD BaseURL
    When Create a new QoD session with all parameters with incorrect QoS profile
    Then Response code is 400

  @QoDSessionCreatePhonenumber
  Scenario: Create QoD session with Phonenumber as blank
    Given Use the QOD BaseURL
    When Create a new QoD session with all parameters with phoneno. as blank
    Then Response code is 400

  @QoDSessionCreatePublicPort
  Scenario: Create QoD session with invalid integer PublicPort
    Given Use the QOD BaseURL
    When Create a new QoD session with all parameters with invalid public port
    Then Response code is 400


  @QoDSessionCreatePublicPort
  Scenario: Create QoD session with invalid string PublicPort
    Given Use the QOD BaseURL
    When Create a new QoD session with all parameters with invalid public port string
    Then Response code is 400


  @QoDSessionCreatePublicAddress
  Scenario: Create QoD session with PublicAddress as null
    Given Use the QOD BaseURL
    When Create a new QoD session with all parameters with publicaddress as null
    Then Response code is 400

  @QoDSessionCreatePublicAddress
  Scenario: Create QoD session with invalid PublicAddress
    Given Use the QOD BaseURL
    When Create a new QoD session with all parameters with publicaddress as invalid value
    Then Response code is 400

  @QoDSessionCreateIpv6addrr
  Scenario: Create QoD session with invalid ipv6addr
    Given Use the QOD BaseURL
    When Create a new QoD session with all parameters with  invalid ipv6addr value
    Then Response code is 400

  @QoDSessionGetQoSProfile
  Scenario: QoD session Get QoSProfile
    Given Use the QOD BaseURL
    When Get QoS Profile
    Then Response code is 200

  @QoDSessionGetQoSProfileQoSL
  Scenario: QoD session Get QoSProfile QOS_L
    Given Use the QOD BaseURL
    When Get QoS Profile with QoSProfile
    Then Response code is 200
