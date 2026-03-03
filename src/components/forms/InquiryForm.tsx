'use client';

import { useState } from 'react';
import Button from '@/components/shared/Button';

const counselingOptions = [
  '개인상담',
  '커플상담',
  '가족상담',
  '그룹상담',
  '성장 프로그램',
  '심리검사',
  '기업심리(EAP)',
  '추천 패키지 (정부지원)',
  '기타',
];

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    counselingType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', email: '', counselingType: '', message: '' });
      }
    } catch {
      alert('문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-black mb-3">문의가 접수되었습니다</h3>
        <p className="text-black-light mb-6">
          빠른 시일 내에 연락드리겠습니다.<br />
          감사합니다.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          추가 문의하기
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-beige-200 bg-white text-black placeholder-beige-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            placeholder="홍길동"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-beige-200 bg-white text-black placeholder-beige-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            placeholder="010-1234-5678"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
          이메일
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-beige-200 bg-white text-black placeholder-beige-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label htmlFor="counselingType" className="block text-sm font-medium text-black mb-2">
          상담 유형 <span className="text-red-500">*</span>
        </label>
        <select
          id="counselingType"
          required
          value={formData.counselingType}
          onChange={(e) => setFormData({ ...formData, counselingType: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-beige-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
        >
          <option value="">선택해주세요</option>
          {counselingOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
          상담 내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-beige-200 bg-white text-black placeholder-beige-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
          placeholder="상담받고 싶은 내용을 자유롭게 적어주세요."
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? '접수 중...' : '상담 문의하기'}
      </Button>

      <p className="text-xs text-black-light/60 text-center">
        제출하신 개인정보는 상담 목적으로만 사용되며, 상담 종료 후 안전하게 폐기됩니다.
      </p>
    </form>
  );
}
