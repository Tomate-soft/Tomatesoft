import {
  ACTIVE_TEXT,
  BillStatusOptions,
  CANCELLED_TEXT,
  DISABLED_TEXT,
  FINISHED_TEXT,
  FOR_PAYMENT_TEXT,
  PENDING_TEXT,
} from '@/types/status.types';

export function formatStatus(status: string) {
  const statusMap = {
    [BillStatusOptions.ENABLE_STATUS]: {
      text: ACTIVE_TEXT,
      style: {
        backgroundColor: "green",
        borderRadius: '50%',
        width: '12px',
        height: '12px',
      },
    },
    [BillStatusOptions.DISABLED_STATUS]: {
      text: DISABLED_TEXT,
      style: {
        backgroundColor: 'red',
        borderRadius: '50%',
        width: '12px',
        height: '12px',
      },
    },
    [BillStatusOptions.PENDING_STATUS]: {
      text: PENDING_TEXT,
      style: {
        backgroundColor: 'yellow',
        borderRadius: '50%',
        width: '12px',
        height: '12px',
      },
    },
    [BillStatusOptions.FINISHED_STATUS]: {
      text: FINISHED_TEXT,
      style: {
        backgroundColor: "#48e",
        borderRadius: '50%',
        width: '12px',
        height: '12px',
      },
    },
    [BillStatusOptions.CANCELLED_STATUS]: {
      text: CANCELLED_TEXT,
      style: {
        backgroundColor: "#E20D18",
        borderRadius: '50%',
        width: '12px',
        height: '12px',
      },
    },
    [BillStatusOptions.FOR_PAYMENT_STATUS]: {
      text: FOR_PAYMENT_TEXT,
      style: {
        backgroundColor: "#e19333",
        borderRadius: '50%',
        width: '12px',
        height: '12px',
      },
    },
  };

  const { text, style } = statusMap[status] || {
    text: '--',
    style: {
      backgroundColor: 'gray',
      borderRadius: '50%',
      width: '12px',
      height: '12px',
    },
  };

  return (
    <td
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <div style={style}></div>
      <span>{text}</span>
    </td>
  );
}
