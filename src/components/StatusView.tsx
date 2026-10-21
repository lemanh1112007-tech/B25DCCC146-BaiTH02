import type { FC } from 'react';
import type { UIStatus } from '../types';

interface StatusViewProps {
  status: UIStatus;
  errorMessage?: string;
  onRetry?: () => void;
}

export const StatusView: FC<StatusViewProps> = ({ status, errorMessage, onRetry }) => {
  if (status === 'initial') {
    return (
      <div className="status-view initial-state">
        <div className="status-icon">🇻🇳 🌤️</div>
        <h3>Chào mừng bạn đến với ứng dụng Thời Tiết</h3>
        <p>
          Vui lòng chọn một thành phố từ danh sách bên trái để xem thông tin thời tiết hiện tại và
          dự báo 7 ngày tới.
        </p>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="status-view loading-state">
        <div className="spinner" aria-label="Đang tải dữ liệu"></div>
        <p className="loading-text">Đang tải dữ liệu thời tiết Open-Meteo...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="status-view error-state">
        <div className="status-icon">⚠️</div>
        <h3>Không thể tải dữ liệu thời tiết</h3>
        <p>{errorMessage || 'Đã có lỗi xảy ra trong quá trình kết nối đến máy chủ.'}</p>
        {onRetry && (
          <button type="button" className="retry-btn" onClick={onRetry}>
            🔄 Thử lại
          </button>
        )}
      </div>
    );
  }

  return null;
};

