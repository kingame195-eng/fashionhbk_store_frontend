/**
 * Shipping Calculator Component
 *
 * Component tính phí vận chuyển dựa trên địa chỉ nhận hàng.
 * Hỗ trợ:
 * - Chọn tỉnh/thành phố
 * - Hiển thị phí vận chuyển ước tính
 * - Thời gian giao hàng dự kiến
 *
 * @module components/cart/ShippingCalculator
 */

import { useState, useMemo } from "react";
import styles from "./ShippingCalculator.module.css";

// Dữ liệu các tỉnh/thành phố và phí ship
const PROVINCES_DATA = [
  { id: "hcm", name: "TP. Hồ Chí Minh", shippingFee: 0, days: "1-2" },
  { id: "hn", name: "Hà Nội", shippingFee: 0, days: "1-2" },
  { id: "dn", name: "Đà Nẵng", shippingFee: 3.99, days: "2-3" },
  { id: "hp", name: "Hải Phòng", shippingFee: 4.99, days: "2-3" },
  { id: "ct", name: "Cần Thơ", shippingFee: 4.99, days: "2-3" },
  { id: "bd", name: "Bình Dương", shippingFee: 2.99, days: "1-2" },
  { id: "dn2", name: "Đồng Nai", shippingFee: 2.99, days: "1-2" },
  { id: "tth", name: "Thừa Thiên Huế", shippingFee: 5.99, days: "3-4" },
  { id: "qn", name: "Quảng Ninh", shippingFee: 5.99, days: "3-4" },
  { id: "other", name: "Tỉnh/Thành khác", shippingFee: 7.99, days: "3-5" },
];

const TruckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/**
 * Format giá tiền sang định dạng USD
 */
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price || 0);
};

/**
 * Shipping Calculator Component
 *
 * @param {Object} props
 * @param {Function} props.onShippingChange - Callback khi phí vận chuyển thay đổi
 * @param {number} props.subtotal - Tổng tiền hàng (để tính miễn phí ship)
 * @param {number} props.freeShippingThreshold - Ngưỡng miễn phí vận chuyển
 */
export default function ShippingCalculator({
  onShippingChange,
  subtotal = 0,
  freeShippingThreshold = 100,
}) {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Tính phí ship dựa trên tỉnh và tổng tiền
  const shippingInfo = useMemo(() => {
    if (!selectedProvince) return null;

    const province = PROVINCES_DATA.find((p) => p.id === selectedProvince);
    if (!province) return null;

    // Miễn phí ship nếu đạt ngưỡng
    const isFreeShipping = subtotal >= freeShippingThreshold;
    const finalFee = isFreeShipping ? 0 : province.shippingFee;

    return {
      ...province,
      originalFee: province.shippingFee,
      finalFee,
      isFreeShipping,
    };
  }, [selectedProvince, subtotal, freeShippingThreshold]);

  // Gọi callback khi phí ship thay đổi
  const handleProvinceChange = (e) => {
    const value = e.target.value;
    setSelectedProvince(value);

    if (value) {
      const province = PROVINCES_DATA.find((p) => p.id === value);
      const isFreeShipping = subtotal >= freeShippingThreshold;
      const fee = isFreeShipping ? 0 : province?.shippingFee || 0;

      if (onShippingChange) {
        onShippingChange({
          provinceId: value,
          provinceName: province?.name,
          fee,
          days: province?.days,
        });
      }
    }
  };

  return (
    <div className={styles.shippingCalculator}>
      {/* Header */}
      <button className={styles.header} onClick={() => setIsExpanded(!isExpanded)} type="button">
        <div className={styles.headerContent}>
          <TruckIcon />
          <span>Tính phí vận chuyển</span>
        </div>
        <span className={`${styles.arrow} ${isExpanded ? styles.expanded : ""}`}>▼</span>
      </button>

      {/* Content */}
      <div className={`${styles.content} ${isExpanded ? styles.expanded : ""}`}>
        {/* Province Select */}
        <div className={styles.selectWrapper}>
          <MapPinIcon />
          <select
            value={selectedProvince}
            onChange={handleProvinceChange}
            className={styles.select}
          >
            <option value="">-- Chọn tỉnh/thành phố --</option>
            {PROVINCES_DATA.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        {/* Shipping Info */}
        {shippingInfo && (
          <div className={styles.shippingInfo}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Phí vận chuyển:</span>
              <div className={styles.feeInfo}>
                {shippingInfo.isFreeShipping ? (
                  <>
                    <span className={styles.freeShipping}>Miễn phí</span>
                    {shippingInfo.originalFee > 0 && (
                      <span className={styles.originalFee}>
                        {formatPrice(shippingInfo.originalFee)}
                      </span>
                    )}
                  </>
                ) : (
                  <span className={styles.fee}>{formatPrice(shippingInfo.finalFee)}</span>
                )}
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>
                <ClockIcon />
                Thời gian giao hàng:
              </span>
              <span className={styles.days}>{shippingInfo.days} ngày</span>
            </div>

            {!shippingInfo.isFreeShipping && subtotal > 0 && (
              <div className={styles.freeShippingNote}>
                💡 Mua thêm {formatPrice(freeShippingThreshold - subtotal)} để được miễn phí vận
                chuyển
              </div>
            )}
          </div>
        )}

        {/* Shipping Methods */}
        <div className={styles.methods}>
          <h4>Phương thức vận chuyển:</h4>
          <div className={styles.methodList}>
            <label className={styles.methodOption}>
              <input type="radio" name="shippingMethod" value="standard" defaultChecked />
              <div className={styles.methodInfo}>
                <span className={styles.methodName}>Giao hàng tiêu chuẩn</span>
                <span className={styles.methodDesc}>3-5 ngày làm việc</span>
              </div>
              <span className={styles.methodPrice}>
                {shippingInfo?.isFreeShipping ? "Miễn phí" : "Phí cơ bản"}
              </span>
            </label>

            <label className={styles.methodOption}>
              <input type="radio" name="shippingMethod" value="express" />
              <div className={styles.methodInfo}>
                <span className={styles.methodName}>Giao hàng nhanh</span>
                <span className={styles.methodDesc}>1-2 ngày làm việc</span>
              </div>
              <span className={styles.methodPrice}>+$5.00</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
