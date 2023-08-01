# MyHome Project 2.0

**💻 웹, 앱 어플리케이션**

**📅 2023.01 ~**

**🏢 개인 프로젝트**

## 담당 직무


- Front-End
- Back-End
- Server
- CI/CD
- etc…

## 담당 업무


- Project Structure Design
    - Back-End
        - Spring Boot
        - Django
    - Front-End
        - NEXT JS
    - Server
        - Ubuntu
- Web (NEXT JS)
    - Sign In &Up
        - Back-end [JAVA] : JWT, Spring Security
        - Front-End : REST(POST), storage
    - Title Page
        - Check Access Rights
    - Main Page
        - Main
            - Components : Notice, Weather, Light (IoT)
        - Notice
            - Append
            - Delete
            - Inquiry
        - Weather
            - Change Location
            - Inquiry detail information
        - Light (IoT)
            - Remote control of the light
        - Cloud
            - Upload : Multiple Uploads, preview about image
            - Download : Multiple Downloads
            - Make new Folder
- Application (Android)
    - Update Android SDK Version : 29 → 32
    - Apply MVVM Pattern
    - Change Weather API Server (Direct API → Spring Boot API)
    - Change DB Communicatation route (PHP → Spring Boot)
    - Change Cloude Servce Access route (SSH → Spring Boot)
    - Change the Authentication method for user info (user info → JWT)
    - Refactoring Code about HTTP feature (AsyncTask → Retrofit)
- Back-End (Spring Boot, Django)
    - Spring Boot
        - Sign In & Up
        - Check Access Right
        - Weather API
            - Get Weather info from the Meteorological Administration API and Reformat data
        - Notice
        - IoT (Light)
            - Recive : Http
            - Send : Kafka
        - Cloud
            - Upload (Multiple, preview about image)
            - Download (Multiple)
            - Video Stream
            - File Delete
            - Check All Files Status in Cloud Server
                - Get Signal : Kafka
    - Django
        - Check Light Status Periodically and Save info to DB
            - Comm : MQTT
            - Cycle : 1min
        - Light Control
            - Send & Recive : MQTT
        - Send Signal (Check files) to Spring Boot
- ETC
    - DB (Maria DB)
        - Modify Table, Column based on Normalization
        - Modify Table, Column name based on Naming Rules
    - Voice recognitaion based light control
        - Use Google STT service
    - ESP8266
        - Change Button Processing to Interrupt

## 성과


- Improved Security And Reliability
- Improved Scalability
- Additional features increase Accessibility and Convenience

## 링크


- Spring Boot
    - link : [https://github.com/sonjuhy/MyHomeSpring](https://github.com/sonjuhy/MyHomeSpring)
- Django
    - link : [https://github.com/sonjuhy/MyHomeDjango](https://github.com/sonjuhy/MyHomeDjango)
- NEXT JS
    - link : [https://github.com/sonjuhy/MyHomeNextJS](https://github.com/sonjuhy/MyHomeNextJS)
- ESP 8266
    - link : [https://github.com/sonjuhy/MyHomESP8266](https://github.com/sonjuhy/MyHomESP8266)
- Android (Regacy Code : No updates due to security related to server IP)
    - link : [https://github.com/sonjuhy/MyHome_Open](https://github.com/sonjuhy/MyHome_Open)

## 개발 환경 & 기술 스택


- IDE
    - Intelli J
    - Visual Studio Code
    - PyCharm
    - Android Studio
    - Arduino
    - MobaXterm
- Tec
    - Spring Boot
    - Spring Security
    - JWT
    - JPA
    - Django
    - Kafka ( + zookeeper)
    - Mosquitto (MQTT)
    - MariaDB
    - NEXT JS
    - Docker
    - Jenkins
- Language
    - JAVA
    - Python
    - TypeScript
    - C++

### Client

![Untitled](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/23e5fc92-435f-4384-af0f-14cc3b24ade2)

### Back-End

![Untitled 1](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/96695998-e0b6-4de6-bca9-f33265461b52)

## 구조도


![MyHome2 0_structure](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/7ae25622-3b37-496d-8bbf-a47aaac0239e)

## 안드로이드 코드 리팩토링


### MVVM 패턴 적용

> No Pattern → MVVM Pattern
> 

![Untitled 2](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/389c3581-ee79-4f71-8b7d-9a0ceb81c0c6)

### Deprecated 코드 변경

> AsyncTask → Retrofit2
> 

![Untitled 3](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/21e6c0cb-b469-440e-943e-83b9c19e2ad4)

## 서비스 사진


## WEB

### Main Page

> Only Access User
> 

![MyHome_Main](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/73e8543e-a854-48b9-8de9-b93349e70a7d)

![MyHome_Main2](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/9077544a-e97d-4838-9df6-fc5a9947e2f8)

### Notice Page

> Notice Main Page
> 

![MyHome_Notice_main](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/a6861770-0f74-40eb-9557-35d4ff1cbbc9)

### Cloud Page

> Cloud Main Page
> 

![MyHome_Cloud](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/95f04061-6d7c-4489-8a1b-47a810b16d7e)

> Cloud Main Page [Image View]
> 

![MyHome_Cloud_img](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/e19dd84c-33a1-4dd3-890f-ae71ca9f798c)

> Cloud Main Page [Video Streaming]
> 

![MyHome_Cloud_video](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/1427c5c7-2d38-43c2-a81d-3de3f51b9cce)

> Cloud Main Page [Multiple Select & Download, Delete]
> 

![MyHome_Cloud_select](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/cce41120-05e7-41d3-8f07-8df15a6492ff)

> Cloud Main Page [Multiple Upload, Preview about Image]
> 

![MyHome_Cloud_upload](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/4d0063ae-b2fe-4389-8aa0-9a68126d8c23)

> Cloud Main Page [Move to Trash Folder, Restore File in Trash Folder]
> 

![MyHome_Cloud_Trash](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/628efb1b-b792-437b-8b66-925e0b11b365)

> Cloud Main Page [Make New Folder]
> 

![MyHome_Cloud_mkdir](https://github.com/sonjuhy/MyHomeVer2/assets/2987059/22cee862-2eec-4780-b8f6-15b1facd7690)
