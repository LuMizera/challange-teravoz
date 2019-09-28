export interface UserMessage {
  type:
    | 'call.new'
    | 'dialer'
    | 'call.standby'
    | 'call.waiting'
    | 'actor.entered'
    | 'call.ongoing'
    | 'actor.left'
    | 'call.finished'
    | '';
  call_id: string;
  direction: 'internal' | 'inbound' | '';
  our_number: string;
  their_number: string;
  their_number_type?: 'mobile' | 'not mobile' | '';
  timestamp: string;
  queue?: number;
  actor?: string;
  number?: string; // número do ramal do atendente
}

// export interface Dialer {
//   type: 'dialer' | '';
//   numbers: [string];
//   destination: string;
//   destination_type: 'queue' | 'perr' | 'conference' | 'custom' | '';
//   code:
//     | 'call.new'
//     | 'call.standby'
//     | 'call.waiting'
//     | 'call.ongoing'
//     | 'call.overflow'
//     | 'call.follow-me'
//     | 'call.finished'
//     | '';
//   retries: string;
//   retry_gap: string;
//   ttl: string;
// }
