openapi: 3.0.3
info:
  title: QoD for Enhanced Communication
  description: The Quality-On-Demand (QoD) API provides a programmable interface for developers and users.
paths:
  /sessions:
    post:
      summary: Creates a new session
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateSession"
        required: true
      responses:
        "201":
          description: Session created
        "400":
          description: Bad Request
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorInfo"
        "500":
          description: Internal Server Error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorInfo"
components:
  schemas:
    CreateSession:
      type: object
      properties:
        duration:
          type: integer
          description: Session duration in seconds.
        device:
          type: object
        applicationServer:
          type: object
        qosProfile:
          $ref: "#/components/schemas/QosProfileName"
        webhook:
          type: object
          required:
            - notificationUrl
          properties:
            notificationUrl:
              type: string
            notificationAuthToken:
              type: string
        required:
          - device
          - applicationServer
          - qosProfile
    QosProfileName:
      type: string
      example: QCI_1_voice
    ErrorInfo:
      type: object
      properties:
        status:
          type: integer
        code:
          type: string
        message:
          type: string
        required:
          - status
          - code
          - message
