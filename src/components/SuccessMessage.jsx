const SuccessMessage = ({ message, onClose }) => {
  return (
    <div
      style={{
        backgroundColor: "#d4edda",
        color: "#155724",
        border: "1px solid #c3e6cb",
        padding: "10px",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          X
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;
