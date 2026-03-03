import { Metadata } from 'next';
import AnimatedSection from '@/components/shared/AnimatedSection';
import ReviewCard from '@/components/reviews/ReviewCard';

export const metadata: Metadata = {
  title: '상담 후기',
  description: '도담상담센터 상담을 경험한 내담자분들의 솔직한 후기입니다.',
};

const sampleReviews = [
  {
    id: '1',
    clientInitial: '김○○',
    counselingType: '개인상담',
    content: '6개월간 직장 스트레스로 힘들었는데, 상담을 통해 제 감정을 올바르게 인식하고 대처하는 방법을 배웠습니다. 상담사 선생님의 따뜻한 공감이 큰 힘이 되었어요. 이제는 스트레스 상황에서도 차분하게 대응할 수 있게 되었습니다.',
    rating: 5,
    createdAt: '2025.12.15',
  },
  {
    id: '2',
    clientInitial: '이○○',
    counselingType: '커플상담',
    content: '연인과의 소통 문제로 이별 직전까지 갔었는데, 커플 상담을 통해 서로를 이해하는 방법을 배웠습니다. 지금은 더 깊은 대화를 나눌 수 있게 되었고, 관계가 훨씬 좋아졌어요.',
    rating: 5,
    createdAt: '2025.11.28',
  },
  {
    id: '3',
    clientInitial: '박○○',
    counselingType: '성장 프로그램',
    content: '퍼스널 브랜딩 프로그램을 수강했는데, 단순히 외적인 브랜딩이 아니라 내면의 가치부터 정립하는 과정이 정말 좋았습니다. 진로에 대한 확신이 생겼고, 이직에도 성공했습니다!',
    rating: 5,
    createdAt: '2025.11.10',
  },
  {
    id: '4',
    clientInitial: '정○○',
    counselingType: '개인상담',
    content: '자존감이 낮아서 항상 남의 눈치를 보며 살았는데, 상담을 통해 제 가치를 인정하는 법을 배웠습니다. 8회 상담 후 확실히 제 삶의 주인이 된 느낌이에요. 도담상담센터에 정말 감사합니다.',
    rating: 5,
    createdAt: '2025.10.22',
  },
  {
    id: '5',
    clientInitial: '최○○',
    counselingType: '그룹상담',
    content: '처음에는 그룹 상담이 어색했는데, 비슷한 고민을 가진 또래들과 이야기하면서 "나만 이런 게 아니구나" 하는 안도감을 느꼈어요. 서로 응원하며 성장하는 경험이 귀중했습니다.',
    rating: 4.5,
    createdAt: '2025.10.05',
  },
  {
    id: '6',
    clientInitial: '한○○',
    counselingType: '가족상담',
    content: '부모님과의 관계가 항상 불편했는데, 가족상담을 통해 서로의 입장을 이해하게 되었습니다. 상담사 선생님이 중립적이면서도 따뜻하게 이끌어주셔서 편안하게 이야기할 수 있었어요.',
    rating: 5,
    createdAt: '2025.09.18',
  },
  {
    id: '7',
    clientInitial: '윤○○',
    counselingType: '개인상담',
    content: '취업 스트레스로 우울감이 심했는데, 상담을 통해 제 감정을 정리하고 현실적인 계획을 세울 수 있었습니다. 무엇보다 제가 충분히 잘하고 있다는 걸 깨달았어요.',
    rating: 5,
    createdAt: '2025.09.01',
  },
  {
    id: '8',
    clientInitial: '조○○',
    counselingType: '성장 프로그램',
    content: '나를 알아가는 여행 프로그램을 듣고 나서 제 강점과 가치관을 명확히 정리할 수 있었습니다. 매주 과제도 실생활에 바로 적용할 수 있어서 실질적인 도움이 됐어요.',
    rating: 4.5,
    createdAt: '2025.08.20',
  },
];

export default function ReviewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="text-sm tracking-[0.2em] uppercase font-medium text-accent">Reviews</span>
              <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                상담 후기
              </h1>
              <p className="mt-6 text-lg md:text-xl text-black-light leading-relaxed">
                도담상담센터와 함께 변화를 경험한 분들의 이야기입니다.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-beige-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">4.9</div>
              <p className="text-sm text-black-light mt-1">평균 만족도</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">98%</div>
              <p className="text-sm text-black-light mt-1">추천 의향</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">5,000+</div>
              <p className="text-sm text-black-light mt-1">누적 상담</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleReviews.map((review, index) => (
              <AnimatedSection key={review.id} delay={index * 0.08}>
                <ReviewCard {...review} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
