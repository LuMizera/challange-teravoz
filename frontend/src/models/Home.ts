export interface Call {
  type:
    | "call.new"
    | "dialer"
    | "call.standby"
    | "call.waiting"
    | "actor.entered"
    | "call.ongoing"
    | "actor.left"
    | "call.finished"
    | "";
  call_id: string;
  direction: "internal" | "inbound" | "";
  our_number: string;
  their_number: string;
  their_number_type?: "mobile" | "not mobile" | "";
  timestamp: string;
  queue?: number;
  actor?: string;
  number?: string; // número do ramal do atendente
}

export interface HomeModals {
  createOpen: boolean;
  attendQueueModal: boolean;
}
