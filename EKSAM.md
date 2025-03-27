# EKSAM QUESTION

## Uge 8:

* **Understand WebRTC on a surface level instead of on a protocol level.**
    - **What is WebRTC?**
        * WebRTC (Web RTC = Real-Time Communication) enables real-time peer-to-peer communication between browsers or devices, supporting audio, video, and data sharing without plugins.

    - **Supported Programming Languages**: JavaScript, WebAssembly

    - **Supported Protocols**:

        | Protocol     | Directionality            | Statefulness |
        |-------------|---------------------------|-------------|
        | HTTP         | Unidirectional           | Stateless   |
        | SSE          | Unidirectional           | Stateful    |
        | WebSocket    | Bidirectional            | Stateful    |
        | WebTransport | Bidirectional            | Stateful    |
        | WebRTC       | Bidirectional/Unidirectional | Stateful |
        | QUIC         | Multiplexed, Bidirectional | Stateful |

    - **Key Features of WebRTC**:
        * Peer-to-peer communication.
        * Low latency for real-time interactions.
        * Built-in support for audio, video, and data channels.

* **Comparison: WebSocket vs WebRTC**
    - **WebSocket**:
        * Client-server protocol for full-duplex communication.
        * Ideal for chat apps or real-time notifications.

    - **WebRTC**:
        * Peer-to-peer communication optimized for real-time audio, video, and data sharing.
        * Ideal for video conferencing, file sharing, or multiplayer gaming.

    - **Key Differences**:
        * WebSocket is client-server; WebRTC is peer-to-peer.
        * WebRTC is optimized for media streaming; WebSocket is better for general-purpose data exchange.

* **Understands what OpenAPI is and why it exists.**
    - **What is OpenAPI?** 
        * OpenAPI is a specification for describing RESTful APIs in a standardized format, making it easier for developers to understand and use APIs.

    - **Key Points:**
        *  **Swagger**: Originally the name of the specification and the company behind it.
        * **Version History**: OpenAPI began with version 3.0, and updates have continued to version 3.1.0, which added support for JSON Schema.
        * **File Syntax**: OpenAPI uses YAML (Yet Another Markup Language), which is human-readable and easy to write.

    - **Why Does OpenAPI Exist?**
        * To provide a clear and consistent way to describe APIs.
        * To facilitate better API documentation, client generation, and automated testing.
