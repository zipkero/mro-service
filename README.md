# MRO Service 프로젝트

MRO(Maintenance, Repair, and Operations) 서비스의 REST API 개발 프로젝트

## 프로젝트 구조

```
mro-service/
├── mro-api-gateway/      # NestJS - 인증 및 요청 라우팅
├── mro-user/             # NestJS - 사용자 관리
├── mro-product/          # NestJS - 제품, 재고
├── mro-order/            # NestJS - 주문, 배송
├── mro-payment/          # NestJS - 결제
└── docker-compose.yml    # 개발 환경 설정
```

## DB 구조

### 회원

- companies: 회사/조직 정보 (회사명, 사업자번호, 연락처, 주소 등)
- accounts: 거래 주체 (개인 또는 회사 소속, 실제 구매/판매 계약의 당사자)
- users: 시스템 로그인 사용자 (Account에 소속된 직원이나 개인)
- roles: 역할 정의
- account_roles: Account와 Role의 매핑 테이블 (1:n)
- user_roles: User와 Role의 매핑 테이블 (1:n)

### 제품

- categories: 제품 카테고리 계층 구조 (부모-자식 관계를 가진 카테고리 정보)
- products: 제품의 기본 정보 (제품명, SKU, 설명, 가격, 카테고리 등)
- product_variants: 동일 제품의 다양한 버전 (크기, 색상 등 옵션에 따른 변형)
- attribute_definitions: 제품 속성 정의 (속성명, 데이터 타입 등)
- attribute_category_mappings: 카테고리별로 적용되는 속성 매핑
- attribute_product_values: 개별 제품의 속성값 저장
- product_images: 제품 이미지 URL과 이미지 정보

### 재고

- inventory: 제품별 재고 현황 (가용 수량, 예약 수량, 재주문 수준 등)
- inventory_movements: 재고 이동 이력 (입고, 출고, 반품 등)

### 배송

- shipping_addresses: 배송지 주소 정보 (주소록 ID, 계정 ID, 수령인명, 연락처, 우편번호, 주소 등)
- shipping_methods: 제공 가능한 배송 방법 (일반배송, 특급배송, 당일배송 등)
- shipping_zones: 배송 지역에 따른 분류 (지역별 배송비 정책 적용)
- shipping_rates: 배송 방법과 지역에 따른 배송비 정책

### 주문

- orders: 주문 기본 정보 (주문번호, 고객, 총액, 상태 등)
- order_items: 주문에 포함된 개별 제품 항목
- order_status_history: 주문 상태 변경 이력
- carts: 장바구니 정보
- cart_items: 장바구니에 담긴 제품 항목

### 결제

- payments: 결제 정보 (결제 방법, 금액, 상태 등)
- payment_methods: 지원하는 결제 방법 (신용카드, 계좌이체, 후불 등)
- invoices: 청구서 정보
- refunds: 환불정보

## 추후 진행

- 계약 및 가격 관리
- 다단계 승인 시스템
- 통합 청구 및 정산
- 공급망 관리
- 견적 및 제안 관리
- 모니터링

## 서비스별 역할

### API Gateway (NestJS)

- 모든 외부 요청의 진입점
- 인증/인가 처리
- 요청 라우팅 및 로드 밸런싱
- 요청/응답 변환 및 검증

### User Service (NestJS)

- 사용자 관리 (CRUD)
- 인증 관련 비즈니스 로직
- JWT 토큰 발급 및 관리
- 사용자 권한 관리

### Product Service (NestJS)

- 제품 정보 관리
- 제품 검색 및 필터링
- 재고 관리
- 제품 카테고리 관리

### Order Service (NestJS)

- 주문 처리 및 관리
- 결제 연동
- 주문 상태 관리
- 배송 정보 관리

## 프로젝트 개발 가이드

### NestJS 서비스

- 모듈 기반 구조
- DTO를 통한 데이터 검증
- 서비스 레이어에서 비즈니스 로직
- 컨트롤러는 라우팅만 담당

## API 설계

- RESTful API 원칙 준수
- 버전 관리: URL 경로에 버전 포함 (예: /api/v1/...)
- 응답 형식 표준화:
  ```json
  {
    "success": boolean,
    "data": any,
    "error": {
      "code": string,
      "message": string
    }
  }
  ```

### 보안

- API Gateway에서 JWT 기반 인증
- 서비스 간 통신은 내부 네트워크에서만 허용
- 환경 변수로 민감한 정보 관리
- CORS 설정은 API Gateway에서 중앙 관리

### 배포

- Docker 컨테이너화
- docker-compose로 개발 환경 구성
- 서비스별 독립적인 스케일링 가능
