파인하우스 관리자 게시판 설치 안내 (GitHub + Vercel, Supabase 없음)

1) 이 폴더의 파일/폴더 전체를 기존 GitHub 저장소 SWIM-OUR-LIFE/pine-house-site 루트에 업로드합니다.
   기존 index.html은 이 패키지의 index.html로 교체합니다.
   추가되는 항목: admin/index.html, api/admin/*.js, lib/shared.js, content/posts.json, uploads 폴더

2) GitHub에서 Fine-grained personal access token을 생성합니다.
   Repository access: Only select repositories -> pine-house-site
   Repository permissions: Contents = Read and write
   토큰은 절대 HTML이나 JavaScript 파일에 입력하지 않습니다.

3) Vercel 프로젝트 pine-house-site -> Settings -> Environment Variables에 아래 5개를 등록합니다.
   ADMIN_ID                 관리자 로그인 아이디 (예: fineadmin)
   ADMIN_PASSWORD           관리자 비밀번호 (긴 무작위 비밀번호 권장)
   ADMIN_SESSION_SECRET     32자 이상의 무작위 비밀 문자열
   GITHUB_REPOSITORY        SWIM-OUR-LIFE/pine-house-site
   GITHUB_CONTENT_TOKEN     2)에서 생성한 GitHub 토큰
   Production, Preview, Development 중 실제 배포 환경에 적용할 환경을 선택합니다.

4) 환경변수 저장 후 Vercel에서 Redeploy 합니다.

5) 접속 주소: https://finehouse.co.kr/admin
   관리자 아이디/비밀번호로 로그인합니다.

운영 참고:
- 게시글은 content/posts.json, 이미지는 uploads/ 폴더에 저장됩니다.
- 게시/수정/삭제 시 GitHub 커밋이 발생하고 Vercel이 자동 배포합니다. 반영까지 잠시 걸릴 수 있습니다.
- 이미지 한 장은 4MB 이하, JPG/PNG/WEBP만 지원합니다. 사진을 웹용으로 압축해 올리는 것을 권장합니다.
- GitHub 토큰과 관리자 비밀번호는 채팅으로 보내지 마세요.
- 현재 게시판은 관리자 단일 계정용이며, 공개 회원가입은 없습니다.
- 견적 문의 양식은 기존 방식(내용 정리/복사)을 그대로 유지합니다.
