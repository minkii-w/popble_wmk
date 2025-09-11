// components/board/ModifyComponent.jsx
import { useEffect, useState } from "react";
import { getOne, patchOne } from "../../api/BoardApi"; // ✅ 실제 API 연결

const ModifyComponent = ({ id }) => {
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getOne(id);
        // ⚠️ 여기서 data 구조 확인 필요
        // 예: { id, title, content, writer, createTime ... }
        setForm({
          title: data.title,
          content: data.content,
        });
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        setError("게시글을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    try {
      await patchOne(id, form);
      alert("수정되었습니다.");
      // 필요하면 수정 후 상세 페이지로 이동:
      // navigate(`/boards/general/${id}`);
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  if (loading) return <div>로딩중…</div>;

  return (
    <div className="mt-6 space-y-4">
      {error && (
        <div className="p-3 rounded bg-red-50 text-red-600 text-sm">{error}</div>
      )}

      <input
        className="w-full p-3 border rounded"
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="제목"
      />
      <textarea
        className="w-full p-3 border rounded h-40"
        name="content"
        value={form.content}
        onChange={onChange}
        placeholder="내용"
      />
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        저장
      </button>
    </div>
  );
};

export default ModifyComponent;
