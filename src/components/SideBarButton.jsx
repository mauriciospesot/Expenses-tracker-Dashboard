export default function SideBarButton({ label, onOpen, svg, className }) {
  return (
    <li>
      <button onClick={onOpen} className={className}>
        {svg}

        <span className="ms-3">{label}</span>
      </button>
    </li>
  );
}
