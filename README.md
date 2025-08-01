### 👨‍💻 개발자 정보 김석전, 송도중학교 정보교사 / 인하대학교 겸임교수  
📅 Since 2023.04.24 | 📧 alphaco@kakao.com  
WebSerial과 WebBLE를 이용해 다양한 인공지능 서비스 결과를 유/무선으로 MCU에 전송하는 로컬 웹앱입니다.  

✅ 아두이노, 마이크로비트, ESP32, 라즈베리파이 피코 등 모든 MCU를 사용할 수 있습니다.  
🌐 Chrome, Edge 브라우저에서 테스트 되었습니다.  
⚙️ 하드웨어는 블록코딩이나 텍스트 코딩을 이용해 사전에 코드 업로드가 필요합니다.  
🚀 인공지능에 다양한 출력장치를 연결하여 AIoT 애플리케이션을 제작해 보세요.  

📜 CCL: BY-NC-ND  


### 👨‍💻 수정자 정보 김주현  
📅 Since 2025.07.27 | 📧 mtinet@hanmail.net  

✅ Raspberry Pi Pico W에 최적화하였습니다.  
✅ BLE 통신의 송신 부분 Service UUID, Charactorictic UUID를 수정하였습니다.   
✅ AI인식 장치(데스크탑, 노트북, 스마트폰 등)의 처리속도에 비해 MCU의 통신 속도가 느려서 발생하는 병목 현상을 데이터 전송량 및 전송속도 최적화를 통해 해소하였습니다.  
✅ 메인 페이지의 음성 인식 부분 디자인 버그를 수정하였습니다.  
✅ 카메라를 토글 할 수 있도록 수정하였습니다.  

🌐 윈도우 컴퓨터, 안드로이드에서는 Chrome브라우저로 BLE통신을 사용할 수 있습니다.  
🌐 애플 생태계(아이폰)에서는 Bluefy 브라우저를 사용해 웹페이지에 접속하면 BLE통신을 사용할 수 있습니다.  

TM 테스트 링크
- 이미지(보자기, 주먹): https://teachablemachine.withgoogle.com/models/-iyVG7y9w/  
- 포즈(고개들기, 고개숙이기): https://teachablemachine.withgoogle.com/models/hX1r_1wCh/  
- 오디오(오리, 사과): https://teachablemachine.withgoogle.com/models/ANbGmoscjL/  

PicoW 연결
- picoW/bluetoothConnect.py 파일을 Raspberry Pi Pico W에 업로드 하고 실행합니다.  
- https://mtinet.github.io/AI4MCU 사이트의 각 솔루션들에 들어가서 '블루투스 장치 유형' 드롭다운을 누릅니다.
- 일반 UART장치를 선택하고 '블루투스 연결' 버튼을 누릅니다.
- 페어링 장치가 보이는 창에서 켜져 있는 Pico W의 블루투스 이름을 선택합니다.
- 학습된 결과에 따라 데이터가 잘 보내지는지 확인합니다.
- 프로젝트를 개선합니다.  
