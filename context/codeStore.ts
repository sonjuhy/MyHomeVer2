const codeStore: { [key: string]: any } = {
  tmp: {
    tmp: {
      len: 0,
      title: [],
      code: [],
    },
  },
  android: {
    tmp: {
      len: 0,
      title: [],
      code: [],
    },
  },
  backend: {
    jwt: {
      len: 1,
      title: [`JWTProvider`],
      code: [
        `@Configuration
      public class JwtTokenProvider implements InitializingBean {
          private String secretKey = "MyHomeProjectHS256AlgorithmPrivateSecretKey"; //must over 256 bit
          private Key key;
      
          // 토큰 유효시간 30분
          private final static long accessTokenValidTime = 10 * 3600 * 60 * 1000L; // 10일
          private final static long refreshTokenValidTime = 20 * 3600 * 60 * 1000L; // 10일
      
          @Autowired
          UserRepository userRepository;
      
          // 객체 초기화, secretKey를 Base64로 인코딩한다.
          @PostConstruct
          protected void init() {
              secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
          }
      
          @Override
          public void afterPropertiesSet() throws Exception {
              byte[] keyBytes = Decoders.BASE64.decode(secretKey);
              this.key = Keys.hmacShaKeyFor(keyBytes);
          }
          // JWT 토큰 생성
          public String createToken(String userPk, String roles, boolean choice) {
              Claims claims = Jwts.claims().setSubject(userPk); // JWT payload 에 저장되는 정보단위, 보통 여기서 user를 식별하는 값을 넣는다.
              claims.put("roles", roles); // 정보는 key / value 쌍으로 저장된다.
              Date now = new Date();
              long validTime = 0;
              if(choice){
                  validTime = accessTokenValidTime;
              }
              else{
                  validTime = refreshTokenValidTime;
              }
              return Jwts.builder()
                      .setClaims(claims) // 정보 저장
                      .setIssuedAt(now) // 토큰 발행 시간 정보
                      .setExpiration(new Date(now.getTime() + validTime)) // set Expire Time
                      .signWith(key, SignatureAlgorithm.HS256) // 사용할 암호화 알고리즘과
                      .compact();
          }
      
          // JWT 토큰에서 인증 정보 조회
          public Authentication getAuthentication(String token) {
              UserDetails userDetails = userRepository.findByAccessToken(token).orElseThrow(() -> new UsernameNotFoundException(token));
              return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
          }
      
          // 토큰에서 회원 정보 추출
          public String getUserPk(String token) {
              return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
          }
      
          // Request의 Header에서 token 값을 가져옵니다. "Authorization" : "TOKEN값'
          public String resolveToken(HttpServletRequest request) {
              return request.getHeader("Authorization");
          }
      
          // 토큰의 유효성 + 만료일자 확인
          public boolean validateToken(String jwtToken) {
              try {
      //            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
      //            return !claims.getBody().getExpiration().before(new Date());
                  Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken);
                  return true;
              } catch (Exception e) {
                  return false;
              }
          }
      }`,
      ],
    },
    rule: {
      len: 0,
      title: [],
      code: [],
    },
    jwtFilter: {
      len: 1,
      title: ["JWTCustomFilter"],
      code: [
        `protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    log.info("doFilterInternal request url : {}", request.getRequestURI());
    String url = request.getRequestURI();
    if(checkURLJWTList(url)){
        String[] urlArr = url.split("/");
        String token = urlArr[urlArr.length - 1];
        if(jwtTokenProvider.validateToken(token)){
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            filterChain.doFilter(request, response);
        }
        else{
            log.info("doFilterInternal token validate result is false");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
    else{
        try{
            // 헤더에서 JWT 를 받아옵니다.
            String token = jwtTokenProvider.resolveToken(request);
            if(token != null){
                // 유효한 토큰인지 확인합니다.
                if (jwtTokenProvider.validateToken(token)) {
                    // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옵니다.
                    Authentication authentication = jwtTokenProvider.getAuthentication(token);
                    // SecurityContext 에 Authentication 객체를 저장합니다.
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    filterChain.doFilter(request, response);
                }
                else {
                    log.info("doFilterInternal token validate result is false");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                }
            }
            else{
                log.info("doFilterInternal token is null");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        }
        catch (Exception e){
            log.info("doFilterInternal exception");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");
        }
    }
}`,
      ],
    },
    whiteList: {
      len: 1,
      title: ["White-List Filter"],
      code: [
        ` private static final String[] URL_JWT_LIST = {
        "/file/downloadPublicMedia/",
        "/file/downloadPublicImageLowQuality/",
        "/file/streamingPublicVideo/",
        "/file/downloadPrivateMedia/",
        "/file/downloadPrivateImageLowQuality/",
        "/file/streamingPrivateVideo/",
        "/file/downloadThumbNail/",
};

private boolean checkURLJWTList(String url){
  for(String list : URL_JWT_LIST){
      if(url.contains(list)) return true;
  }
  return false;
}

// code in JWTCustomFilter - doFilterInternal
if(checkURLJWTList(url)){
  String[] urlArr = url.split("/");
  String token = urlArr[urlArr.length - 1];
  if(jwtTokenProvider.validateToken(token)){
      Authentication authentication = jwtTokenProvider.getAuthentication(token);
      SecurityContextHolder.getContext().setAuthentication(authentication);

      filterChain.doFilter(request, response);
  }
  else{
      log.info("doFilterInternal token validate result is false");
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
  }
}
`,
      ],
    },
    customFilter: {
      len: 1,
      title: ["CustomFilter"],
      code: [
        `public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

        @Autowired
        private RequestMappingHandlerMapping requestMappingHandlerMapping;
    
        @Override
        public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
            int endPointResult = isEndPointExist(request);
            if(endPointResult == 1){
                response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
            }
            else if(endPointResult == -1){
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }
        }
        private int isEndPointExist(HttpServletRequest request){
            log.info("isEndPoint request url : {}", request.getRequestURI());
            Map<RequestMappingInfo, HandlerMethod> map = requestMappingHandlerMapping.getHandlerMethods();
            Set<RequestMappingInfo> requestMappingInfoSet = map.keySet();
    
            int result = -1; // 404
    
            for(RequestMappingInfo requestMappingInfo : requestMappingInfoSet){
                Set<String> directPaths = requestMappingInfo.getDirectPaths();
                if (!directPaths.isEmpty() && directPaths.contains(request.getRequestURI())) {
                    Set<RequestMethod> methods = requestMappingInfo.getMethodsCondition().getMethods();
                    if (!methods.isEmpty()) {
                        if(!methods.contains(RequestMethod.valueOf(request.getMethod()))) result = 1; // 405
                        else return 0; // 200
                    }
                }
            }
            return result;
        }
    }`,
      ],
    },
    weatherFeature: {
      len: 0,
      title: [],
      code: [],
    },
    iotFeature: {
      len: 0,
      title: [],
      code: [],
    },
    sftp: {
      len: 0,
      title: [],
      code: [],
    },
    fullSearch: {
      len: 0,
      title: [],
      code: [],
    },
    thumbnail: {
      len: 0,
      title: [],
      code: [],
    },
    lowQualityImage: {
      len: 0,
      title: [],
      code: [],
    },
    walksAndBulk: {
      len: 0,
      title: [],
      code: [],
    },
    batch: {
      len: 0,
      title: [],
      code: [],
    },
    CIAndCD: {
      len: 0,
      title: [],
      code: [],
    },
    restart: {
      len: 0,
      title: [],
      code: [],
    },
    container: {
      len: 0,
      title: [],
      code: [],
    },
    weatherMaintenance: {
      len: 0,
      title: [],
      code: [],
    },
    cloud: {
      len: 0,
      title: [],
      code: [],
    },
    onlyLogic: {
      len: 0,
      title: [],
      code: [],
    },
    migration: {
      len: 0,
      title: [],
      code: [],
    },
    buildLogSystem: {
      len: 0,
      title: [],
      code: [],
    },
    logDivPart: {
      len: 0,
      title: [],
      code: [],
    },
    block: {
      len: 0,
      title: [],
      code: [],
    },
    enum: {
      len: 0,
      title: [],
      code: [],
    },
  },
};
export default codeStore;
