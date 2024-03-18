const explainStore: { [key: string]: any } = {
  android: {
    tmp: {
      title: "",
      content: "",
      problem: [""],
      solution: [""],
    },
  },
  backend: {
    jwt: {
      title: "서버 ↔ 클라이언트 통신 간 데이터 보안 필요",
      content: "JWT 적용",
      problem: [
        "기존에는 api 호출 할때 유저 정보가 필요 시, 별도의 암호화 없이 그대로 전송하였기에 정보가 중간에 탈취 될 경우 그대로 정보가 유출되기에 암호화 하여 통신을 하도록 변경해야함.",
      ],
      solution: [
        "JWT를 이용하여 토큰을 이용하여 개인 인증을 하도록 변경. 토큰에 저장되는 값도 민감하지 않은 정보를 이용하여 혹시나 경우를 대비.",
      ],
    },
    rule: {
      title: "계정 별 접근 권한 분리 필요",
      content: "Rule을 부여하여 계정 별 서비스 접근 권한 부여",
      problem: [
        "기존에는 회원가입만 할 경우 누구나 서비스 접근 가능한 문제가 존재. 서비스의 접근성이 넓어진 만큼 외부인원이 함부로 서비스를 사용하지 못하도록 제한을 걸어야 할 필요성 제기.",
      ],
      solution: [
        "계정 정보에 Rule을 추가하여 정회원 이상만 서비스에 접근 가능하도록 설정. 뿐만 아니라 관리자와 정회원도 구분하여 관리자 기능이 필요할 상황을 대비.",
      ],
    },
    jwtFilter: {
      title: "비지니스 로직 실행 전, 요청에 대한 권한 확인 필요",
      content: "커스텀 JWT 필터를 적용",
      problem: [
        "일부 제외하고 대부분 기능에서 동일한 보안 정책을 가져가야하는 상황에서 보안이 필요한 모든 기능이 실행되기 전에 비즈니스 로직에서 처리하는 것보다 미리 인가 / 인증을 처리하도록 하고싶음.",
      ],
      solution: [
        "Spring Security에 커스텀 JWT 필터를 적용하여 API 요청이 왔을때, 올바른 권한을 가진 요청인지 아닌지를 판단하여 알맞은 결과를 실행하도록 함.",
      ],
    },
    whiteList: {
      title: "일부 API 요청할때 header 안에 토큰을 담기 힘든 경우 존재",
      content: "해당 api만 url에 토큰을 추가하고 white 리스트로 별도 관리",
      problem: [
        "일부 API를 요청할때 header 안에 JWT 토큰을 넣기 힘든 경우가 존재하여 url안에 넣는 방식으로 대신 인가 / 인증을 처리하고자 함.",
      ],
      solution: [
        "해당 API url을 white-list로 분류하여 별도의 인가 / 인증 로직을 통해 올바른 권한을 가진 요청인지 확인 후 결과를 실행하도록 함.",
      ],
    },
    customFilter: {
      title: "클라이언트 개발을 위해 상황별 상태값 리턴 필요",
      content: "커스텀 필터를 통해 httpStatus 코드 리턴",
      problem: [
        "단순하게 권한 체크 우선 이후 로직 처리 패턴으로 하니 존재하지 않는 API요청을 올바르지 않은 권한으로 요청할 경우 404가 아닌 401이 리턴되는 상황이 발생. 클라이언트 개발할 때도 아주 좋지않은 상황이기에 수정하기로 결정.",
      ],
      solution: [
        "커스텀 필터를 통해 권한 에러 뿐만 아니라 여러 에러 상황들(404, 405 등)을 올바르게 리턴함으로서 클라이언트 개발 및 사용자 입장에서도 정확한 정보를 제공하도록 수정함.",
      ],
    },
    weatherFeature: {
      title: "모든 클라이언트에게 날씨 정보 제공",
      content:
        "기상청 API를 서버에서 호출 및 데이터 파싱을 통해 클라이언트에게 전송",
      problem: [
        "날씨 정보 제공을 위해 최소 3개의 API를 호출하고 데이터를 파싱하는 과정이 필요. 특히 모바일 환경에서는 연산이 많아질수록 베터리 런타임에도 악영향.",
      ],
      solution: [
        "서버에서 기상청으로부터 데이터를 받고 가공하여 클라이언트는 최소한의 데이터로만 필요한 정보를 사용자에게 제공할 수 있도록 변경.",
      ],
    },
    iotFeature: {
      title: "웹에서도 IoT 서비스를 사용할 수 있어야 함",
      content: "IoT 제어 관련 API를 제공",
      problem: [
        "안드로이드에서 MQTT를 통해 IoT를 제어 하던 방식 대신 간단하게 많은 리소스를 사용하지 않고 사용하고 싶어함.",
      ],
      solution: [
        "Rest API를 통해 기능을 제공하고 서버에서 해당 값으로 IoT를 제어하는 방향으로 서비스 제공.",
      ],
    },
    sftp: {
      title: "파일 제어를 직접 제어하는 위험이 큼",
      content: "파일 제어 요청만 하고 서버에서 처리하는 방식으로 변경",
      problem: [
        "기존에는 안드로이드에서 SFTP를 통해 직접 제어하였음. 그에 따라 속도와 파일 제어에 대한 안정성 그리고 추가 기능(썸네일 등)을 위해 방식 변경 필요.",
      ],
      solution: [
        "파일 정보를 DB에 최신화하여 저장하고 이를 통해 클라이언트는 정보를 주고받는 형식으로 변경. 파일 제어는 서버에서 담당.",
      ],
    },
    fullSearch: {
      title: "클라우드 서비스 외 방식으로 제어된 파일 정보 최신화를 해야함",
      content: "주기적으로 클라우드 파일 풀 서치를 통해 파일 정보 최신화",
      problem: [
        "집 내부 네트워크를 통해 파일을 제어하는 경우 파일 정보가 DB에 저장이 안됨.",
      ],
      solution: [
        "Scheduler를 사용하여 매일 밤 12시 비동기로 클라우드 하드 풀 서치를 통해 파일 정보 전부 최신화 유지.",
      ],
    },
    thumbnail: {
      title: "이미지, 비디오 파일들을 바로 인식하기 어려움",
      content: "썸네일을 이용하여, 해당 파일에 대한 정보 제공",
      problem: [
        "이미지 및 비디오 파일은 썸네일을 통해 미리 파일에 대한 정보를 확인 할 수 있는 방법이 존재함.",
      ],
      solution: [
        "클라우드 풀 서치할때, 비디오 파일은 추가적으로 썸네일 제작 과정을 통해 해당 기능을 제공하도록 함.",
      ],
    },
    lowQualityImage: {
      title: "썸네일 혹은 이미지 미리보기 기능에 너무 많은 데이터 소모",
      content: "이미지 해상도를 낮게 포맷하여 제공",
      problem: [
        "이미지 미리보기 기능에 사용되는 이미지의 용량이 너무 커서 과도한 데이터 사용을 요구함.",
        "영상 썸네일 기능에 사용되는 이미지의 용량이 너무 커서 과도한 데이터 사용을 요구함.",
      ],
      solution: [
        "미리보기용 이미지를 전송 전 화질 다운그레이드 후 전송으로 데이터 용량 줄임.",
        "썸네일은 제작 할때 저용량으로 제작하여 데이터 용량 줄임.",
      ],
    },
    walksAndBulk: {
      title: "풀 서치 후 DB에 파일 정보 저장하는데 너무 오래 걸림",
      content: "탐색은 walks, insert는 bulk를 이용",
      problem: [
        "파일 갯수가 5천개에서 14만개 이후 300만개까지 증가하여서 해당 데이터들을 탐색하고 DB에 단순하게 insert하는데 시간이 너무 오래걸림.",
      ],
      solution: [
        "탐색하는 방식을 walks를 통해 498% 시간 개선을 이뤄냈고, DB에 데이터를 넣는 방식을 bulk으로 변경 후 1,689% 시간 개선을 이뤄냄.",
      ],
    },
    batch: {
      title:
        "영상 갯수가 늘어남에 따라 같이 늘어난 썸네일 만드는 시간을 줄이기",
      content: "Spring batch의 multi-thread 이용",
      problem: [
        "영상 파일 갯수가 100개에서 1400개로 증가함에 따라 하루에 한번 풀 서치할때 소요되는 시간이 1시간 추가 됨.",
      ],
      solution: [
        "Spring batch의 multi-thread를 이용하여 3개로 비동기 처리하여 시간을 20분으로 단축시킴.",
      ],
    },
    CIAndCD: {
      title: "배포해야할 서비스가 증가함에 따라 자동 CI/CD 필요",
      content: "Docker와 Jenkins, GitHub를 이용한 자동 CI/CD 구축",
      problem: [
        "웹, 백엔드(Spring, Django), 로그 웹, 로그 백엔드 등 배포해야할 서비스가 많아짐에 따라 수동 배포보단 자동 배포로 효율성 높일 필요성 증가.",
      ],
      solution: [
        "서버에서 기상청으로부터 데이터를 받고 가공하여 클라이언트는 최소한의 데이터로만 필요한 정보를 사용자에게 제공할 수 있도록 변경.",
      ],
    },
    restart: {
      title: "쉽게 서비스 자동 재시작 필요",
      content: "Docker 컨테이너 옵션을 이용한 자동 재시작",
      problem: [
        "서버가 수시로 발생한 정전으로 인해 강제 재부팅이 빈번하게 발생. 서버 재부팅 완료 시, 서비스 재시작 필요.",
      ],
      solution: [
        "Docker 컨테이너 옵션 중 restart 옵션을 사용하여 서버 재부팅 시, 컨테이너 재시작하도록 설정.",
      ],
    },
    container: {
      title: "서비스를 다른 서버로 언제든 옮길 수 있도록 준비 필요",
      content: "서비스를 Docker 컨테이너화",
      problem: [
        "서버가 수시로 발생한 정전으로 인해 내구성에 대한 신뢰성 하락. 서비스를 언제든 옮길 수 있도록 준비.",
      ],
      solution: [
        "서비스 코드를 전부 Docker 컨테이너 화. MongoDB의 데이터는 외부 하드에 백업.",
      ],
    },
    weatherMaintenance: {
      title: "기상청 API 변경에 대한 대응 및 추후 변경 가능성에 대해 대비",
      content:
        "기상청 API 변경되어 이에 대해 대응 및 기능 서버로 이전하여 중앙화",
      problem: [
        "기존에 안드로이드에서 제공하는 기상청 API가 주소, API key 만료, 제공된 데이터값 변동에 의해 서비스 중지.",
      ],
      solution: [
        "클라이언트(안드로이드)에서 사용중이던 기상청 API가 API 주소, key, 데이터 타입이 달라지는 상황 발생하여, 날씨 서비스를 서버로 중앙화 하여 유지 보수를 쉽게 변경.",
      ],
    },
    cloud: {
      title: "파일 제어를 직접 제어하는 위험이 큼",
      content: "파일 제어 요청만 하고 서버에서 처리하는 방식으로 변경",
      problem: [
        "기존에는 안드로이드에서 SFTP를 통해 직접 제어하였음. 그에 따라 속도와 파일 제어에 대한 안정성 그리고 추가 기능(썸네일 등)을 위해 방식 변경 필요.",
      ],
      solution: [
        "파일 정보를 DB에 최신화하여 저장하고 이를 통해 클라이언트는 정보를 주고받는 형식으로 변경. 파일 제어는 서버에서 담당.",
      ],
    },
    onlyLogic: {
      title: "IoT 비즈니스 로직에 집중하고자 함",
      content:
        "Django 프레임워크를 도입함으로 비즈니스 로직에 좀 더 집중하고자 함",
      problem: [
        "멀티 프로세싱, 다운되었을때 재실행, DB와의 연동 등을 프레임워크에 전담하고 비즈니스 로직만 개발하여 개발 효율을 올리고자 함.",
      ],
      solution: [
        "Django 프레임워크 및 orm을 사용하여 훨씬 더 안정적으로 서비스를 제공할 수 있을 뿐만 아니라 여러 라이브러리 사용으로 개발 효율도 상승함.",
      ],
    },
    migration: {
      title: "기존 Python 스크립트를 이식",
      content: "같은 Python 기반 프레임워크 Django로 이식",
      problem: [
        "기존 Python 스크립트를 개발 효율 증가 및 관리 편의성 상승을 위해 프레임워크로 이식을 해야함.",
      ],
      solution: [
        "같은 Python 기반인 Django 프레임워크를 선택하여 이식을 좀 더 수월하게 하도록 함.",
      ],
    },
    buildLogSystem: {
      title: "서비스가 늘어남에 따라 로그 확인이 제한적",
      content: "kafka를 이용해서 로그 시스템 구축",
      problem: ["서비스가 늘어날수록 로그를 확인하는 난이도가 높아짐."],
      solution: [
        "kafka, mongodb를 이용해서 로그를 수집하고 해당 로그를 웹으로 확인할 수 있도록 하여 외부에서도 로그를 쉽게 수집 및 확인 할 수 있도록 함.",
      ],
    },
    logDivPart: {
      title: "하나의 분류로 로그를 전부 모으니 확인 어려움",
      content: "서비스 별 로그를 분리하여 수집하고 확인 할 때 더 수월",
      problem: [
        "모든 로그를 한 분류로 보관하니 개별 서비스 확인하는 것이 어려움.",
      ],
      solution: [
        "서비스 별로 로그를 분리, 관리하여 로그를 확인할때 원하는 로그를 더 쉽고 간단하게 확인 할 수 있도록 함.",
      ],
    },
    block: {
      title: "서비스를 구현할때 추후 발생할 수 있는 리팩토링을 염두해야함",
      content:
        "기능 별 코드를 블럭화 하여 수정 필요시 해당 부분만 수정하도록 함",
      problem: [
        "수시로 서비스 수정 혹은 추가 요청에 따라 잦은 기능 수정을 수월하게 대응해야함.",
      ],
      solution: [
        "기능을 블럭화 하여 기능을 수정할때 해당 블럭만 수정하면 다른 기능에게 최대한 영향을 미치지 않도록 설계하여 리팩토링을 대비.",
      ],
    },
    enum: {
      title: "문자열 혹은 숫자로 하드코딩 된 부분 수정 필요",
      content: "Enum을 이용하여 데이터를 통합하여 관리하도록 함",
      problem: [
        "문자열 혹은 숫자로 하드코딩으로 데이터들이 각 파일별 별도로 파편화되어있어서 수정 혹은 관리가 매우 불편함.",
        "Server (example)",
        "Android (example)",
      ],
      solution: [
        "Enum을 통해 데이터를 일괄적으로 통합하여 관리하는 방법으로 변경. 이후 수정이 필요하더라도 enum 파일만 수정하면 되도록 구축.",
        "Server - BatchEnum.java",
        "Android - RoomInfoEnum.java",
      ],
    },
  },
  iot: {
    tmp: {
      title: "",
      content: "",
      problem: [""],
      solution: [""],
    },
    origin: {
      title: "MQTT 서버와 연결이 끊긴 경우 제어 불가능",
      content: "MQTT 서버와 재연결 시도 되는 동안 버튼 제어 불가능",
      problem: [
        "MQTT 서버와 연결이 끊긴 경우 연결 재시작 과정이 5초 걸리고 그동안 제어 불가능. 싱글 스레드라서 별도로 분리 불가.",
      ],
      solution: ["Ver 1 코드의 에러 설명란."],
    },
    connect: {
      title: "MQTT 서버와 연결 시도를 메인 스레드와 별개로 분리 필요",
      content: "MQTT 서버와 연결하는 부분을 인터럽트로 이동",
      problem: ["MQTT 서버와 연결 시도를 메인 스레드와 별개로 분리 필요"],
      solution: [
        "재연결 기능을 인터럽트로 처리하여 메인 스레드로부터 분리. 스위치 제어와는 별개로 작동하도록 함.",
      ],
    },
    control: {
      title: "인터럽트 기능이 너무 무거움",
      content: "인터럽트 기능 자체를 최대한 가볍게 변경",
      problem: ["MQTT 재연결은 인터럽트 기능으로 넣기에 너무 무거운 기능."],
      solution: [
        "MQTT 재연결은 메인 스레드로 처리하고, 버튼 제어를 인터럽트로 처리하여 가볍게 처리함.",
      ],
    },
  },
};
export default explainStore;
