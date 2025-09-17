export default function ReadComponent({ id, moveToModify, moveToList }) {
  return (
    <div>
      <div className="mb-3">ReadComponent — id: {id}</div>
      <div className="flex gap-2">
        <button className="px-3 py-1 border rounded" onClick={moveToModify}>수정</button>
        <button className="px-3 py-1 border rounded" onClick={moveToList}>목록</button>
      </div>
    </div>
  );
}
