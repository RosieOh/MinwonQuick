// 문의 카테고리 데이터
export const contactCategories = [
  { value: "general", label: "일반 문의", icon: "❓" },
  { value: "technical", label: "기술적 문제", icon: "🔧" },
  { value: "feature", label: "기능 제안", icon: "💡" },
  { value: "bug", label: "버그 신고", icon: "🐛" },
  { value: "data", label: "데이터 관련", icon: "📊" },
  { value: "other", label: "기타", icon: "📝" }
];

// 연락처 방법 데이터
export const contactMethods = [
  {
    title: "이메일",
    description: "가장 빠른 응답을 받을 수 있습니다",
    value: "support@minwonquick.com",
    icon: "📧",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "카카오톡",
    description: "실시간 채팅으로 문의하세요",
    value: "@MinwonQuick",
    icon: "💬",
    color: "from-yellow-400 to-yellow-500"
  },
  {
    title: "전화",
    description: "긴급한 경우 전화로 문의하세요",
    value: "02-1234-5678",
    icon: "📞",
    color: "from-green-500 to-green-600"
  }
];

// 문의 폼 데이터 타입
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
}

// 초기 폼 데이터
export const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  category: "general"
};

// 폼 제출 처리 함수
export const handleContactSubmit = async (
  formData: ContactFormData,
  setIsSubmitting: (value: boolean) => void,
  setSubmitSuccess: (value: boolean) => void,
  setFormData: (data: ContactFormData) => void
) => {
  setIsSubmitting(true);

  try {
    // 실제로는 여기서 API 호출을 하여 문의를 저장합니다
    // 예시: await submitContactForm(formData);
    
    // 현재는 시뮬레이션을 위해 2초 후 성공으로 처리
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData(initialFormData);
  } catch (error) {
    console.error('문의 제출 중 오류 발생:', error);
    setIsSubmitting(false);
    // 에러 처리 로직 추가 가능
  }
};

// 입력 변경 처리 함수
export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  setFormData: (data: ContactFormData) => void,
  currentData: ContactFormData
) => {
  const { name, value } = e.target;
  setFormData({
    ...currentData,
    [name]: value
  });
};

// 폼 유효성 검사 함수
export const validateContactForm = (formData: ContactFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.name.trim()) {
    errors.push("이름을 입력해주세요.");
  }

  if (!formData.email.trim()) {
    errors.push("이메일을 입력해주세요.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push("올바른 이메일 형식을 입력해주세요.");
  }

  if (!formData.subject.trim()) {
    errors.push("제목을 입력해주세요.");
  }

  if (!formData.message.trim()) {
    errors.push("문의 내용을 입력해주세요.");
  } else if (formData.message.trim().length < 10) {
    errors.push("문의 내용은 최소 10자 이상 입력해주세요.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}; 