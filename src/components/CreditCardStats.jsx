import mastercardLogo from "../assets/mastercard.png";
import visaLogo from "../assets/visa.png";

export default function CreditCardStats({
  label,
  value,
  valueSize,
  labelSize,
  cardType,
  imgSize,
}) {
  const cardLogo = cardType === "visa" ? visaLogo : mastercardLogo;
  return (
    <div className="bg-gray-800 overflow-hidden rounded-md shadow-md">
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <div className="flex justify-between">
            <dt
              className={`uppercase font-semibold leading-5 ${labelSize} text-white`}
            >
              {label}
            </dt>
            <img
              src={cardLogo}
              alt={`${cardType} logo`}
              className={`ml-2 ${imgSize}`}
            />
          </div>

          <dd
            className={`mt-1 ${valueSize} leading-9 font-semibold text-white`}
          >
            ${value}
          </dd>
          <dt className="leading-5 text-xs text-white">Close Date: 23/08</dt>
        </dl>
      </div>
    </div>
  );
}
