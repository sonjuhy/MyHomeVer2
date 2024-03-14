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
      len: 1,
      title: ["Weather API list"],
      code: [
        `
      @Operation(description = "도시의 x, y 좌표를 이용하여 현재 날씨 데이터 얻는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "null 일 경우 백엔드 에러. 그 외 정상 처리 자세한 정보는 https://openweathermap.org/current 참조")
      })
      @GetMapping("/getCurrentInfoByCoordinate/{x}/{y}")
      public ResponseEntity<OpenWeatherCurrentDto> getCurrentInfoByCoordinate(@PathVariable int x, @PathVariable int y){
          OpenWeatherCurrentDto dto = weatherService.getCurrentWeatherInfoByCoordinate(x, y);
          return new ResponseEntity<>(dto, HttpStatus.OK);
      }
  
      @Operation(description = "도시의 x, y 좌표를 이용하여 5일간 3시간 데이터 얻는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "null 일 경우 백엔드 에러. 그 외 정상 처리 자세한 정보는 https://openweathermap.org/current 참조")
      })
      @GetMapping("/getForecastInfoByCoordinate/{x}/{y}")
      public ResponseEntity<OpenWeatherForecastDto> getForecastInfoByCoordinate(@PathVariable int x, @PathVariable int y){
          OpenWeatherForecastDto dto = weatherService.getForecastWeatherInfoByCoordinate(x, y);
          return new ResponseEntity<>(dto, HttpStatus.OK);
      }
  
      @Operation(description = "도시의 x, y 좌표를 이용하여 5일의 각각 날의 평균 데이터 얻는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "null 일 경우 백엔드 에러. 그 외 정상 처리 자세한 정보는 https://openweathermap.org/current 참조")
      })
      @GetMapping("/getForecastAverageInfoByCoordinate/{x}/{y}")
      public ResponseEntity<List<ForecastDayDto>> get5DayAverageWeatherInfoByCoordinate(@PathVariable int x, @PathVariable int y){
          List<ForecastDayDto> list = weatherService.get5DayAverageWeatherInfoByCoordinate(x, y);
          return new ResponseEntity<>(list, HttpStatus.OK);
      }`,
      ],
    },
    iotFeature: {
      len: 1,
      title: ["IoT API"],
      code: [
        `@PostMapping("/control/{accessToken}")
      public ResponseEntity<String> control(@RequestBody LightDto dto, @PathVariable String accessToken){
          String userPK = jwtTokenProvider.getUserPk(accessToken);
          if(userPK == null) return new ResponseEntity<>("no data about token", HttpStatus.UNAUTHORIZED);
  
          Optional<UserEntity> entity = userService.findById(userPK);
          if(entity.isEmpty()) return new ResponseEntity<>("no data in user pool", HttpStatus.FORBIDDEN);
  
          lightService.control(dto, entity.get().getName());
          return new ResponseEntity<>(null, HttpStatus.OK);
      }`,
      ],
    },
    sftp: {
      len: 1,
      title: ["Cloud file control API List(Android)"],
      code: [
        `    /*
        * Common Part
        * */
    
        @GET("/file/getDefaultPath")
        Call<List<CloudDefaultPathDto>> getDefaultPath();
    
        /*
        * Public Part
        * */
    
        @GET("/file/getPublicFileInfo")
        Call<CloudPublicDto> getPublicFileInfo(@Query("path") String path);
    
        @GET("/file/getPublicFileListInfo")
        Call<List<CloudPublicDto>> getPublicFileListInfo(@Query("location") String location);
    
        @GET("/file/getPublicFileListInfoPage")
        Call<List<CloudPublicDto>> getPublicFileListInfoPage(@Query("location") String location, @Query("size") int size, @Query("page") int page);
    
        @GET("/file/movePublicFileInfo")
        Call<Integer> movePublicFileInfo(@Query("path") String path, @Query("location") String location);
    
        @POST("/file/downloadPublicFile")
        @Streaming
        Call<ResponseBody> downloadPublicFile(@Body CloudPublicDto dto);
    
        @GET("/file/downloadPublicMedia/{uuid}/{accessToken}")
        @Streaming
        Call<ResponseBody> downloadPublicFileMedia(@Path("uuid") String uuid, @Path("accessToken") String accessToken);
    
        @GET("/file/downloadPublicImageLowQuality/{uuid}/{accessToken}")
        @Streaming
        Call<ResponseBody> downloadPublicImageFileLowQuality(@Path("uuid") String uuid, @Path("accessToken") String accessToken);
    
        @GET("/file/getPublicTrashFiles")
        Call<List<CloudPublicDto>> getPublicTrashFiles(@Query("location") String location);
    
        @POST("/file/uploadPublicFile")
        Call<List<String>> uploadPublicFile(@Query("uploadFile")Multipart multipart, @Query("path") String path);
    
    `,
      ],
    },
    fullSearch: {
      len: 1,
      title: ["Scheduler"],
      code: [
        `@Scheduled(cron = "0 0 0 * * *") // top of e every day
      public void checkCloudFile() {
          logComponent.sendLog("cloud-Check", "[checkCloudFile(Reserve)] check start", true, TOPIC_CLOUD_CHECK_LOG);
          Date date = new Date();
          try {
              JobParameters publicJobParameters = new JobParametersBuilder()
                      .addString("publicCheck-" + date.getTime(), String.valueOf(System.currentTimeMillis()))
                      .toJobParameters();
  
              jobLauncher.run(publicCloudCheckJob, publicJobParameters);
              fileServerPublicService.publicFileTrashStateCheck();
          }
          catch (Exception e){
              logComponent.sendErrorLog("Cloud-Check", "[checkCloudFile(private)] error : ", e, TOPIC_CLOUD_CHECK_LOG);
          }
          try {
              JobParameters privateJobParameters = new JobParametersBuilder()
                      .addString("privateCheck-" + date.getTime(), String.valueOf(System.currentTimeMillis()))
                      .toJobParameters();
              jobLauncher.run(privateCloudCheckJob, privateJobParameters);
              fileServerPrivateService.privateFileTrashCheck();
          }
          catch (Exception e){
              logComponent.sendErrorLog("Cloud-Check", "[checkCloudFile(private)] error : ", e, TOPIC_CLOUD_CHECK_LOG);
          }
      }`,
      ],
    },
    thumbnail: {
      len: 1,
      title: ["Thumbnail control API List"],
      code: [
        `@Operation(description = "썸네일 다운로드 받는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "정상 다운로드 혹은 파일이 없음"),
              @ApiResponse(responseCode = "500", description = "백엔드 에러")
      })
      @GetMapping("/downloadThumbNail/{uuid}/{accessToken}")
      public ResponseEntity<Resource> downloadThumbNail(@PathVariable String uuid, @PathVariable String accessToken){
          return commonService.downloadThumbNail(uuid);
      }
  
      @Operation(description = "썸네일 파일 존재하는지 확인하는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "정상 처리. true : 존재, false : 없음")
      })
      @GetMapping("/checkThumbNailFile/{uuid}")
      public ResponseEntity<Boolean> checkThumbNailFileExist(@PathVariable String uuid){
          boolean result = thumbNailService.checkThumbNailExist(uuid);
          return new ResponseEntity<>(result, HttpStatus.OK);
      }`,
      ],
    },
    lowQualityImage: {
      len: 2,
      title: [
        "Low quality image feature(Public)",
        "Low quality thumbnail image feature",
      ],
      code: [
        `@Override
      public ResponseEntity<Resource> downloadPublicImageLowQuality(String uuid) {
          FileServerPublicEntity entity = fileServerRepository.findByUuid(uuid);
          if(entity != null){
              String pathStr = commonService.changeUnderBarToSeparator(entity.getPath());
              try{
                  File imageFile = new File(pathStr);
  
                  String tmpFileName = "tmpImageName"+System.currentTimeMillis();
                  File outPutFile = new File(commonService.changeUnderBarToSeparator(thumbnailPath)+File.separator+tmpFileName);
                  OutputStream os = new FileOutputStream(outPutFile);
  
                  float quality = 0.2f;
  
                  BufferedImage bufferedImage = ImageIO.read(imageFile);
                  Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpg");
                  if(!writers.hasNext()){
                      logComponent.sendLog("Cloud","downloadPublicMediaLowQuality error : doesn't support format", false, TOPIC_CLOUD_LOG);
                      return new ResponseEntity<>(commonService.getDefaultImageIconFile(), HttpStatus.OK);
                  }
                  else{
                      ImageWriter imageWriter = writers.next();
                      ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(os);
                      imageWriter.setOutput(imageOutputStream);
  
                      ImageWriteParam param = imageWriter.getDefaultWriteParam();
                      param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
                      param.setCompressionQuality(quality);
                      imageWriter.write(null, new IIOImage(bufferedImage, null, null), param);
                      os.close();
                      imageOutputStream.close();
                      imageWriter.dispose();
  
                      Path outPutPath = outPutFile.toPath();
                      HttpHeaders httpHeaders = getHttpHeader(outPutPath, entity.getName());
                      Resource resource = new InputStreamResource(Files.newInputStream(outPutPath)); // save file resource
                      outPutFile.delete();
                      return new ResponseEntity<>(resource, httpHeaders, HttpStatus.OK);
                  }
              } catch (IOException e) {
                  logComponent.sendErrorLog("Cloud","downloadPublicMediaLowQuality error : ", e, TOPIC_CLOUD_LOG);
                  return new ResponseEntity<>(commonService.getDefaultImageIconFile(), HttpStatus.OK);
              }
          }
          else {
              logComponent.sendLog("Cloud", "downloadPublicMediaLowQuality error : file doesn't exist", false, TOPIC_CLOUD_LOG);
              return new ResponseEntity<>(commonService.getDefaultImageIconFile(), HttpStatus.OK);
          }
      }`,
        `@Transactional
      @Override
      public boolean makeThumbNail(File file, String uuid, String type) {
          File thumbnail = new File(uploadPath, uuid+".jpg");
          try{
              FrameGrab frameGrab = FrameGrab.createFrameGrab(NIOUtils.readableChannel(file));
  
              // 첫 프레임의 데이터
              frameGrab.seekToSecondPrecise(1);
  
              Picture picture = frameGrab.getNativeFrame();
  
              // 썸네일 파일에 복사
              BufferedImage bi = AWTUtil.toBufferedImage(picture);
              Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpg");
              if(!writers.hasNext()) {
                  ImageIO.write(bi, "jpg", thumbnail);
              }
              else{
                  OutputStream os = new FileOutputStream(thumbnail);
  
                  float quality = 0.2f;
  
                  ImageWriter imageWriter = writers.next();
                  ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(os);
                  imageWriter.setOutput(imageOutputStream);
  
                  ImageWriteParam param = imageWriter.getDefaultWriteParam();
                  param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
                  param.setCompressionQuality(quality);
                  imageWriter.write(null, new IIOImage(bi, null, null), param);
                  os.close();
                  imageOutputStream.close();
                  imageWriter.dispose();
              }
  
          } catch (Exception e) {
              if(thumbnail.exists()) {
                  thumbnail.delete();
              }
              logComponent.sendErrorLog("Cloud-Check", "makeThumbNail Error : ", e, TOPIC_CLOUD_LOG);
              return false;
          }
          return true;
      }`,
      ],
    },
    walksAndBulk: {
      len: 1,
      title: ["Full Search use walks(Public)"],
      code: [
        `@Override
      public List<File> filesWalkWithReturnMediaFileList() {
          Path originPath = Paths.get(diskPath);
          List<Path> pathList;
          try{
              Stream<Path> pathStream = Files.walk(originPath);
              pathList = pathStream.collect(Collectors.toList());
              List<FileServerPublicDto> fileList = new ArrayList<>();
              List<File> mediaFileList = new ArrayList<>();
              for(Path path : pathList){
                  File file = new File(path.toString());
                  String extension = "dir";
                  if(!file.isDirectory()) {
                      extension = file.getName().substring(file.getName().lastIndexOf(".") + 1); // file type (need to check ex: txt file -> text/plan)
                  }
                  try {
                      String tmpPath = commonService.changeSeparatorToUnderBar(file.getPath());
                      StringBuilder sb = new StringBuilder();
                      String[] tmpPathArr = tmpPath.split("__");
                      for(int i=0;i<tmpPathArr.length-1;i++){
                          sb.append(tmpPathArr[i]).append("__");
                      }
                      String tmpLocation = sb.toString();
  
                      String uuid = UUID.nameUUIDFromBytes(tmpPath.getBytes(StandardCharsets.UTF_8)).toString();
                      fileList.add(new FileServerPublicDto(
                              tmpPath,
                              file.getName(),
                              uuid,
                              extension,
                              (float) (file.length() / 1024),
                              tmpLocation,
                              1,
                              0
                      ));
                      if (Arrays.asList(videoExtensionList).contains(extension) && !thumbNailRepository.existsByUuid(uuid)) {
                          mediaFileList.add(file);
                      }
                  }
                  catch(Exception e){
                      System.out.println(e.getMessage());
                  }
              }
              fileServerCustomRepository.saveBatchPublic(fileList);
              return mediaFileList;
          }
          catch (Exception e){
              logComponent.sendErrorLog("Cloud-Check", "[filesWalk(public)] file check error : ", e, TOPIC_CLOUD_CHECK_LOG);
          }
          return null;
      }`,
      ],
    },
    batch: {
      len: 1,
      title: ["Batch by Multi-thread(Public)"],
      code: [
        `@Bean
      public Flow publicCloudSplitFlow(JobRepository jobRepository, PlatformTransactionManager platformTransactionManager){
          FileDefaultPathEntity entity = defaultPathRepository.findByPathName("thumbnail");
          uploadPath = commonService.changeUnderBarToSeparator(entity.getPublicDefaultPath());
  
          return new FlowBuilder<SimpleFlow>("PublicCloudSplitFlow-" + dateTime)
                  .split(new SimpleAsyncTaskExecutor())
                  .add(
                          publicCloudFlow1(BatchEnum.CLOUD_PRIVATE_PARALLEL_FLOW_NAME.getPublicParallelFlowName(1), jobRepository, platformTransactionManager),
                          publicCloudFlow2(BatchEnum.CLOUD_PRIVATE_PARALLEL_FLOW_NAME.getPublicParallelFlowName(2), jobRepository, platformTransactionManager),
                          publicCloudFlow3(BatchEnum.CLOUD_PRIVATE_PARALLEL_FLOW_NAME.getPublicParallelFlowName(3), jobRepository, platformTransactionManager)
                  )
                  .build();
      }
  
      @Bean
      public Flow publicCloudFlow1(String name, JobRepository jobRepository, PlatformTransactionManager platformTransactionManager){
          return new FlowBuilder<SimpleFlow>(name)
                  .start(publicCloudParallelStep1(name, jobRepository, platformTransactionManager))
                  .build();
      }
  
      @Bean
      public Step publicCloudParallelStep1(String name, JobRepository jobRepository, PlatformTransactionManager platformTransactionManager){
          return new StepBuilder(name, jobRepository)
                  .tasklet(((contribution, chunkContext) -> {
                      int partitionSize = chunkContext.getStepContext().getStepExecution().getJobExecution().getExecutionContext().getInt(BatchEnum.CLOUD_PUBLIC_CHUNK_PARTITION_NAME.getTarget());
                      Pageable pageable = PageRequest.of(0, partitionSize);
                      List<FileServerVideoEntity> videoEntityList = videoRepository.findAllBy(pageable);
                      List<FileInfoDto> fileList = new ArrayList<>();
                      for(FileServerVideoEntity entity : videoEntityList){
                          FileInfoDto tmpDto = new FileInfoDto();
                          tmpDto.setName(entity.getName());
                          tmpDto.setUuid(entity.getUuid());
                          tmpDto.setPath(entity.getPath());
                          fileList.add(tmpDto);
                      }
  
                      if(!fileList.isEmpty()){
                          thumbNailSequence(fileList, uploadPath);
                      }
                      else{
                          contribution.setExitStatus(ExitStatus.FAILED);
                      }
                      return RepeatStatus.FINISHED;            
                  }), platformTransactionManager)
                  .build();
      }
  
      @Bean
      public Flow publicCloudFlow2(String name, JobRepository jobRepository, PlatformTransactionManager platformTransactionManager){
          return new FlowBuilder<SimpleFlow>(name)
                  .start(publicCloudParallelStep2(name, jobRepository, platformTransactionManager))
                  .build();
      }
  
      @Bean
      public Step publicCloudParallelStep2(String name, JobRepository jobRepository, PlatformTransactionManager platformTransactionManager){
          return new StepBuilder(name, jobRepository)
                  .tasklet(((contribution, chunkContext) -> {
                      int partitionSize = chunkContext.getStepContext().getStepExecution().getJobExecution().getExecutionContext().getInt(BatchEnum.CLOUD_PUBLIC_CHUNK_PARTITION_NAME.getTarget());
                      Pageable pageable = PageRequest.of(1, partitionSize);
                      List<FileServerVideoEntity> videoEntityList = videoRepository.findAllBy(pageable);
                      List<FileInfoDto> fileList = new ArrayList<>();
                      for(FileServerVideoEntity entity : videoEntityList){
                          FileInfoDto tmpDto = new FileInfoDto();
                          tmpDto.setName(entity.getName());
                          tmpDto.setUuid(entity.getUuid());
                          tmpDto.setPath(entity.getPath());
                          fileList.add(tmpDto);
                      }
  
                      if(!fileList.isEmpty()){
                          thumbNailSequence(fileList, uploadPath);
                      }
                      else{
                          contribution.setExitStatus(ExitStatus.FAILED);
                      }
                      return RepeatStatus.FINISHED;            
                  }), platformTransactionManager)
                  .build();
      }
  
      @Bean
      public Flow publicCloudFlow3(String name, JobRepository jobRepository, PlatformTransactionManager platformTransactionManager){
          return new FlowBuilder<SimpleFlow>(name)
                  .start(publicCloudParallelStep3(name, jobRepository, platformTransactionManager))
                  .build();
      }
  
      @Bean
      public Step publicCloudParallelStep3(String name, JobRepository jobRepository, PlatformTransactionManager platformTransactionManager){
          return new StepBuilder(name, jobRepository)
                  .tasklet(((contribution, chunkContext) -> {
                      int partitionSize = chunkContext.getStepContext().getStepExecution().getJobExecution().getExecutionContext().getInt(BatchEnum.CLOUD_PUBLIC_CHUNK_PARTITION_NAME.getTarget());
                      Pageable pageable = PageRequest.of(2, partitionSize);
                      List<FileServerVideoEntity> videoEntityList = videoRepository.findAllBy(pageable);
                      List<FileInfoDto> fileList = new ArrayList<>();
                      for(FileServerVideoEntity entity : videoEntityList){
                          FileInfoDto tmpDto = new FileInfoDto();
                          tmpDto.setName(entity.getName());
                          tmpDto.setUuid(entity.getUuid());
                          tmpDto.setPath(entity.getPath());
                          fileList.add(tmpDto);
                      }
  
                      if(!fileList.isEmpty()){
                          thumbNailSequence(fileList, uploadPath);
                      }
                      else{
                          contribution.setExitStatus(ExitStatus.FAILED);
                      }
                      return RepeatStatus.FINISHED;            
                  }), platformTransactionManager)
                  .build();
      }`,
      ],
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
      len: 1,
      title: ["Structure for maintenance about weather feature"],
      code: [
        `@Autowired
      public WeatherServiceImpl(WeatherAPIKeyRepository weatherAPIKeyRepository){
          OPENWEATHERAPI_KEY = weatherAPIKeyRepository.findByServiceName("OpenWeatherAPI").getKey();
          SGIS_SERVICE_KEY = weatherAPIKeyRepository.findByServiceName("SGISServiceKey").getKey();
          SGIS_SECURITY_KEY = weatherAPIKeyRepository.findByServiceName("SGISSecurityKey").getKey();
  
          // Thunderstorm, Drizzle, Rain, Snow, Atmosphere, Clear, Clouds
          openWeatherAPIWeatherHash = new HashMap<>();
          openWeatherAPIWeatherHash.put(0, "Clear");
          openWeatherAPIWeatherHash.put(1, "Clouds");
          openWeatherAPIWeatherHash.put(2, "Atmosphere");
          openWeatherAPIWeatherHash.put(3, "Rain");
          openWeatherAPIWeatherHash.put(4, "Snow");
          openWeatherAPIWeatherHash.put(5, "Drizzle");
          openWeatherAPIWeatherHash.put(6, "Thunderstorm");
      }`,
      ],
    },
    cloud: {
      len: 1,
      title: ["Cloud file control API List(Public)"],
      code: [
        `@Operation(description = "Public 파일을 원하는 폴더로 이동하는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "리턴 값이 0이면 정상 처리")
      })
      @GetMapping("/movePublicFileInfo")
      public ResponseEntity<Integer> movePublicFileInfo(@RequestParam(value="path") String path, @RequestParam(value="location") String location){
          int result = service.moveFile(path, location);
          return new ResponseEntity<>(result, HttpStatus.OK);
      }
  
      @Operation(description = "Public 파일 다운로드 받는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "정상 처리")
      })
      @PostMapping("/downloadPublicFile")
      public ResponseEntity<Resource> downloadPublicFile(@RequestBody FileServerPublicDto dto){
          System.out.println("downloadPublicFile dto : "+dto.toString());
          return service.downloadFile(dto.getUuid());
      }
  
      @Operation(description = "Public 파일 중 미디어(영상 등) 파일 다운로드 하는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "정상 처리"),
              @ApiResponse(responseCode = "401", description = "권한 에러")
      })
      @CrossOrigin(origins = "*")
      @GetMapping("/downloadPublicMedia/{uuid}/{accessToken}")
      public ResponseEntity<Resource> downloadPublicMedia(@PathVariable String uuid, @PathVariable String accessToken){
          return service.downloadPublicMedia(uuid);
      }
  
      @Operation(description = "Public 파일 중 이미지 파일을 낮은 퀄리티로 다운로드 하는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "정상 처리"),
              @ApiResponse(responseCode = "401", description = "권한 에러")
      })
      @CrossOrigin(origins = "*")
      @GetMapping("/downloadPublicImageLowQuality/{uuid}/{accessToken}")
      public ResponseEntity<Resource> downloadPublicImageLowQuality(@PathVariable String uuid, @PathVariable String accessToken){
          return service.downloadPublicImageLowQuality(uuid);
      }
  
      @Operation(description = "Public 파일 중 미디어(영상) 파일 스트리밍 하는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "정상 처리"),
              @ApiResponse(responseCode = "401", description = "권한 에러")
      })
      @CrossOrigin(origins = "*")
      @GetMapping("/streamingPublicVideo/{uuid}/{accessToken}")
      public ResponseEntity<ResourceRegion> streamingPublicVideo(@RequestHeader HttpHeaders httpHeaders, @PathVariable String uuid, @PathVariable String accessToken){
          return service.streamingPublicVideo(httpHeaders, uuid);
      }
  
      @Operation(description = "Public 휴지통 파일 목록 중 원하는 폴더 기준으로 다 받아 오는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "정상 처리")
      })
      @GetMapping("/getPublicTrashFileListInfo")
      public ResponseEntity<List<FileServerPublicTrashEntity>> getPublicTrashFileListInfo(@RequestParam String location){
          List<FileServerPublicTrashEntity> list = service.findByLocationTrash(location);
          return new ResponseEntity<>(list, HttpStatus.OK);
      }
  
      @Operation(description = "Public 휴지통 파일 목록 중 원하는 폴더에 원하는 갯수, 페이지로 받아오는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "정상 처리")
      })
      @GetMapping("/getPublicTrashFileListInfoPage")
      public ResponseEntity<List<FileServerPublicTrashEntity>> getPublicTrashFileListInfoPage(@RequestParam String location, @RequestParam int size, @RequestParam int page){
          List<FileServerPublicTrashEntity> list = service.findByLocationPageTrash(location,  size, page);
          return new ResponseEntity<>(list, HttpStatus.OK);
      }
  
      @Operation(description = "Public 에 파일 업로드 하는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "정상 처리")
      })
      @PostMapping("/uploadPublicFile") // upload files
      public ResponseEntity<List<String>> uploadPublicFile(@RequestParam MultipartFile[] uploadFile, @RequestParam String path, Model model)
      {
          System.out.println("uploadPublicFile : " + path);
          List<String> resultArr = service.uploadFiles(uploadFile, path, model);
          return new ResponseEntity<>(resultArr, HttpStatus.OK); // return filename that success to insert file name in DB
      }
  
      @Operation(description = "Public 에 원하는 위치에 폴더 생성하는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "정상 처리"),
              @ApiResponse(responseCode = "500", description = "서버 에러")
      })
      @PostMapping("/mkdirPublic")
      public ResponseEntity<Void> mkdirPublic(@RequestParam String path){
          if(service.mkdir(path)){
              return new ResponseEntity<>(null, HttpStatus.OK);
          }
          else{
              return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
          }
      }
  
      @Operation(description = "Public 파일 정보 업데이트 하는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "결과 값이 0이면 정상 처리")
      })
      @PutMapping("/updatePublicFileInfo")
      public ResponseEntity<Integer> updatePublicFileInfo(@RequestBody FileServerPublicDto dto){
          int result = service.updateByFileServerPublicEntity(new FileServerPublicEntity(dto));
          return new ResponseEntity<>(result, HttpStatus.OK);
      }
  
      @Operation(description = "Public 파일 중 휴지통에 있던 파일을 복원 하는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "결과 값이 0이면 정상 처리")
      })
      @PutMapping("/restorePublicFile")
      public ResponseEntity<Integer> restorePublic(@RequestParam String uuid){
          int result = service.restore(uuid);
          return new ResponseEntity<>(result, HttpStatus.OK);
      }
  
      @Operation(description = "Public 파일 중 휴지통으로 임시 삭제하는 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "결과 값이 0이면 정상 처리")
      })
      @DeleteMapping("/deletePublicFileToTrash")
      public ResponseEntity<Long> deletePublicFileTrash(@RequestParam String uuid){
          long result = service.moveTrash(uuid);
          return new ResponseEntity<>(result, HttpStatus.OK);
      }
  
      @Operation(description = "Public 휴지통에 있는 파일 완전 삭제 API")
      @ApiResponses(value = {
              @ApiResponse(responseCode = "200", description = "결과 값이 0이면 정상 처리")
      })
      @DeleteMapping("/deletePublicFileInfo/{path}")
      public ResponseEntity<Long> deletePublicFileInfo(@PathVariable String path){
          long result = service.deleteByPath(path); // delete file
          return new ResponseEntity<>(result, HttpStatus.OK);
      }`,
      ],
    },
    onlyLogic: {
      len: 1,
      title: ["ORM code(example)"],
      code: [
        `from django.db import models


      # Create your models here.
      
      
      class RoomLight(models.Model):
          LIGHT_ROOM_PK = models.CharField(max_length=20, primary_key=True)
          STATE_CHAR = models.CharField(max_length=10)
          ROOMKOR_CHAR = models.CharField(max_length=20)
          CATEGORY_CHAR = models.CharField(max_length=100)
          CONNECT_CHAR = models.CharField(max_length=25)
      
          class Meta:
              managed = False
              db_table = 'LIGHT_ROOM_TB'`,
      ],
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
      len: 3,
      title: ["sample", "Server", "Android"],
      code: [
        `public enum Sample{
      TARGET
}`,
        `@Getter
      public enum BatchEnum {
          CLOUD_PUBLIC_CHUNK_PARTITION_NAME("PublicCloudPartition"),
          CLOUD_PUBLIC_PARALLEL_FLOW_NAME("PublicCloudFlow-"),
          CLOUD_PRIVATE_CHUNK_PARTITION_NAME("PrivateCloudPartition"),
          CLOUD_PRIVATE_PARALLEL_FLOW_NAME("PrivateCloudFlow-");
      
          private final String target;
          BatchEnum(String target){
              this.target = target;
          }
          public String getPublicParallelFlowName(int num){
              return CLOUD_PUBLIC_PARALLEL_FLOW_NAME+String.valueOf(num);
          }
          public String getPrivateParallelFlowName(int num){
              return CLOUD_PRIVATE_PARALLEL_FLOW_NAME+String.valueOf(num);
          }
      }`,
        `public enum RoomInfoEnum {
        BALCONY_MAIN("balcony main","balcony"),
        BALCONY_SUB("balcony sub","balcony"),
        BATHROOM_MAIN("bathRoom1","bath Room"),
        BATHROOM_SUB("bathRoom2","bath Room"),
        BIG_ROOM_TOP("big Room1","Big Room"),
        BIG_ROOM_BOTTOM("big Room2","Big Room"),
        KITCHEN_SINK("kitchen sink","kitchen"),
        KITCHEN_TABLE("kitchen table","kitchen"),
        LIVING_ROOM_TOP("living Room1","living Room"),
        LIVING_ROOM_MIDDLE("living Room2","living Room"),
        LIVING_ROOM_BOTTOM("living Room3","living Room"),
        LIVING_ROOM_SUB("living Room sub","living Room"),
        MIDDLE_ROOM_TOP("middle Room1","middle Room"),
        MIDDLE_ROOM_BOTTOM("middle Room2","middle Room"),
        SMALL_ROOM("small Room","small Room");
    
        private final String name;
        private final String category;
        RoomInfoEnum(String name, String category){
            this.name = name;
            this.category = category;
        }
    
        public String getName() {
            return name;
        }
    
        public String getCategory() {
            return category;
        }
        public static String getCategoryByName(String name){
            for(RoomInfoEnum room : values()){
                if(room.getName().equals(name))return room.getCategory();
            }
            return "no data";
        }
        public static String getNameByCategory(String category){
            for(RoomInfoEnum room : values()){
                if(room.getCategory().equals(category)) return room.getName();
            }
            return "no data";
        }
    }`,
      ],
    },
  },
  iot: {
    tmp: {
      len: 0,
      title: [],
      code: [],
    },
  },
};
export default codeStore;
