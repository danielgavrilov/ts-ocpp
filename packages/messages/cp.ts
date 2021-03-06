import { Timestamp } from '../types';
import { DiagnosticsStatus, RegistrationStatus, FirmwareStatus, IdTagInfo, MeterValue, TransactionDataItems } from './common';

type ChargePointMessage = {
  Authorize: {
    request: {
      action: 'Authorize';
      idTag: string
    },
    response: { 
      action: 'Authorize';
      idTagInfo: IdTagInfo
    }
  };
  BootNotification: {
    request: {
      action: 'BootNotification';
      chargeBoxSerialNumber?: string;
      chargePointModel: string;
      chargePointSerialNumber?: string;
      chargePointVendor: string;
      firmwareVersion?: string;
      iccid?: string;
      imsi?: string;
      meterSerialNumber?: string;
      meterType?: string;
    },
    response: {
      action: 'BootNotification';
      currentTime: Timestamp;
      interval: number;
      status: RegistrationStatus;
    }
  };
  DataTransfer: {
    request: {
      action: 'DataTransfer';
      data: string;
      messageId?: string;
      vendorId?: string;
    },
    response: {
      action: 'DataTransfer';
    }
  };
  DiagnosticsStatusNotification: {
    request: {
      action: 'DiagnosticsStatusNotification';
      status: DiagnosticsStatus;
    },
    response: {
      action: 'DiagnosticsStatusNotification';
    }
  };
  FirmwareStatusNotification: {
    request: {
      action: 'FirmwareStatusNotification';
      status: FirmwareStatus;
    },
    response: {
      action: 'FirmwareStatusNotification';
    }
  };
  Heartbeat: {
    request: {
      action: 'Heartbeat';
    },
    response: {
      action: 'Heartbeat';
      currentTime: Timestamp;
    }
  };
  MeterValues: {
    request: {
      action: 'MeterValues';
      connectorId: number;
      meterValue: MeterValue[];
      transactionId: number;
    },
    response: {
      action: 'MeterValues';
    }
  };
  StartTransaction: {
    request: {
      action: 'StartTransaction';
      connectorId: number;
      idTag: string;
      meterStart: number;
      reservationId?: number;
      timestamp: Timestamp; // TODO: maybe string?
    },
    response: {
      action: 'StartTransaction';
    }
  };
  StatusNotification: {
    request: {
      action: 'StatusNotification';
      connectorId: number;
      errorCode: string; // TODO: cpstatus
      info?: string;
      status: string;
      timestamp?: Timestamp;
      vendorErrorCode?: string;
      vendorId?: string;
    },
    response: {
      action: 'StatusNotification';
    }
  };
  StopTransaction: {
    request: {
      action: 'StopTransaction';
      idTag?: string;
      meterStop: number;
      reason?: string;
      timestamp: Timestamp;
      transactionData?: TransactionDataItems[];
      transactionId: number;
    },
    response: {
      action: 'StopTransaction';
    }
  };
}
export type ChargePointAction = keyof ChargePointMessage;

export const chargePointActions: ChargePointAction[] = [
  "Authorize",
  "BootNotification",
  "DataTransfer",
  "DiagnosticsStatusNotification",
  "FirmwareStatusNotification",
  "Heartbeat",
  "MeterValues",
  "StartTransaction",
  "StatusNotification",
  "StopTransaction"
];

export type ChargePointRequest<T extends ChargePointAction> = ChargePointMessage[T]['request'];
export type ChargePointResponse<T extends ChargePointAction> = ChargePointMessage[T]['response'];

export default ChargePointMessage;
