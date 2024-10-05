export default function Stats({ label, value, valueSize, labelSize }) {
  return (
    <div className="overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt
            className={`uppercase font-semibold leading-5 ${labelSize} text-slate-300`}
          >
            {label}
          </dt>
          <dd
            className={`mt-1 ${valueSize} leading-9 font-semibold text-indigo-600`}
          >
            ${value}
          </dd>
        </dl>
      </div>
    </div>
  );
}
