// src/pages/boards/ad/AdModifyForm.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAdOne,
  updateAd,
  updateAdWithImages,
} from "../../../api/AdBoardApi"; // 🔹 AdBoard API 사용

export default function AdModifyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    externalUrl: "",
    contact: "",
    publishStartDate: "",
    publishEndDate: "",
    tags: "",
  });

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===== 기존 데이터 로드 =====
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getAdOne(id);
        setForm({
          title: data.title || "",
          content: data.content || "",
          externalUrl: data.externalUrl || "",
          contact: data.contact || "",
          publishStartDate: data.publishStartDate || "",
          publishEndDate: data.publishEndDate || "",
          tags: data.tags || "",
        });
        if (data.imageList && data.imageList.length > 0) {
          setPreview(`${process.env.REACT_APP_API_SERVER}${data.imageList[0].url}`);
        }
      } catch (e) {
        setError(e.message || "데이터 불러오기 실패");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onPickImage = () => fileRef.current?.click();

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        await updateAdWithImages(id, form, [file]);
      } else {
        await updateAd(id, form);
      }
      alert("수정 완료!");
      navigate(`/boards/ad/${id}`);
    } catch (err) {
      console.error(err);
      alert("수정 실패: " + (err.message || "알 수 없는 오류"));
    }
  };

  const onBack = () => navigate(-1);

  if (loading) return <div className="p-6">로딩 중...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="w-full flex justify-center bg-[#faf5ef] min-h-[100vh]">
      <div className="w-full max-w-[920px] px-6 sm:px-10 py-10">
        <h1 className="text-3xl font-bold mb-8">홍보게시글 수정</h1>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* ===== 제목 ===== */}
          <div className="grid grid-cols-[140px_1fr] gap-6 items-start">
            <div className="pt-3 text-sm font-medium text-gray-800">
              제목
            </div>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder="제목을 입력하세요"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* ===== 내용 ===== */}
          <div className="grid grid-cols-[140px_1fr] gap-6 items-start">
            <div className="pt-3 text-sm font-medium text-gray-800">
              내용
            </div>
            <textarea
              name="content"
              value={form.content}
              onChange={onChange}
              placeholder="내용을 입력하세요"
              className="min-h-[180px] w-full rounded-lg border px-4 py-3"
            />
          </div>

          {/* ===== 외부 링크 ===== */}
          <div className="grid grid-cols-[140px_1fr] gap-6 items-start">
            <div className="pt-3 text-sm font-medium text-gray-800">
              외부 링크
            </div>
            <input
              type="url"
              name="externalUrl"
              value={form.externalUrl}
              onChange={onChange}
              placeholder="https://example.com"
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          {/* ===== 연락처 ===== */}
          <div className="grid grid-cols-[140px_1fr] gap-6 items-start">
            <div className="pt-3 text-sm font-medium text-gray-800">
              연락처
            </div>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={onChange}
              placeholder="010-1234-5678"
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          {/* ===== 게시 기간 ===== */}
          <div className="grid grid-cols-[140px_1fr] gap-6 items-start">
            <div className="pt-3 text-sm font-medium text-gray-800">
              게시 기간
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                name="publishStartDate"
                value={form.publishStartDate}
                onChange={onChange}
                className="w-full rounded-lg border px-4 py-3"
              />
              <input
                type="date"
                name="publishEndDate"
                value={form.publishEndDate}
                onChange={onChange}
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>
          </div>

          {/* ===== 태그 ===== */}
          <div className="grid grid-cols-[140px_1fr] gap-6 items-start">
            <div className="pt-3 text-sm font-medium text-gray-800">
              태그
            </div>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={onChange}
              placeholder="예: 이벤트, 할인"
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          {/* ===== 이미지 ===== */}
          <div className="grid grid-cols-[140px_1fr] gap-6 items-start">
            <div className="pt-3 text-sm font-medium text-gray-800">
              이미지
            </div>
            <div>
              <div
                className="w-[140px] h-[180px] border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50"
                onClick={onPickImage}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <span className="text-sm text-gray-500">이미지 변경</span>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* 버튼들 */}
          <div className="pt-6 flex items-center justify-between border-t">
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl bg-white px-6 py-3 text-sm font-medium border hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-xl bg-green-500 px-8 py-3 text-sm font-semibold text-white hover:brightness-95"
            >
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
