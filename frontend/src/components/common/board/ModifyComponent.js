// frontend/src/components/common/board/ModifyComponent.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";            
import { getOne, patchOne, patchImages } from "../../../api/BoardApi"; // ✅ 경로 수정

const ModifyComponent = ({ id }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [post, setPost] = useState(null);                  
  const [existingImgs, setExistingImgs] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getOne(id);
        setPost(data);                                      
        setForm({ title: data.title || "", content: data.content || "" });
        setExistingImgs((data.images || []).map(im => ({ ...im, keep: true })));
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
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e) => {
    const sel = Array.from(e.target.files || []);
    setNewFiles(sel);
  };

  useEffect(() => {
    previews.forEach(u => URL.revokeObjectURL(u));
    const urls = newFiles.map(f => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach(u => URL.revokeObjectURL(u));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFiles]);

  const toggleKeep = (imgId) => {
    setExistingImgs(arr => arr.map(it => it.id === imgId ? { ...it, keep: !it.keep } : it));
  };

  const onSubmit = async () => {
    try {
      // 1) 본문 저장
      await patchOne(id, form);

      // 2) 이미지 변경사항 반영
      const keepIds = existingImgs.filter(it => it.keep).map(it => it.id);
      const changed = keepIds.length !== existingImgs.length || newFiles.length > 0;
      if (changed) {
        await patchImages(id, keepIds, newFiles);
      }

      // 3) 상세 페이지로 이동
      const typeSlug = (post?.type || "GENERAL").toLowerCase();
      navigate(`/boards/${typeSlug}/${id}`);
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  if (loading) return <div>로딩중…</div>;

  return (
    <div className="mt-6 space-y-6">
      {error && <div className="p-3 rounded bg-red-50 text-red-600 text-sm">{error}</div>}

      {/* 제목/내용 */}
      <div className="space-y-4">
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
      </div>

      {/* 기존 이미지 (유지/삭제 토글) */}
      <div>
        <div className="mb-2 font-semibold">기존 이미지</div>
        {existingImgs.length === 0 ? (
          <div className="text-sm text-gray-500">등록된 이미지가 없습니다.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {existingImgs.map(im => (
              <div key={im.id} className="relative">
                <img src={im.url} alt="" className="w-full h-auto rounded" />
                <button
                  type="button"
                  onClick={() => toggleKeep(im.id)}
                  className={`absolute top-2 right-2 px-2 py-1 text-xs rounded shadow ${
                    im.keep ? "bg-green-600 text-white" : "bg-red-600 text-white"
                  }`}
                  title={im.keep ? "이미지 유지" : "삭제 예정"}
                >
                  {im.keep ? "유지" : "삭제"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 새 이미지 추가 + 미리보기 */}
      <div>
        <div className="mb-2 font-semibold">새 이미지 추가</div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onFileChange}
          className="w-full p-3 border rounded"
        />
        {newFiles.length > 0 && (
          <>
            <div className="mt-2 text-sm text-gray-600">
              {newFiles.length}개 선택: {newFiles.map(f => f.name).join(", ")}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-3">
              {previews.map((src, i) => (
                <img key={i} src={src} alt="" className="w-full h-24 object-cover rounded" />
              ))}
            </div>
          </>
        )}
      </div>

      <button onClick={onSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
        저장
      </button>
    </div>
  );
};

export default ModifyComponent;
