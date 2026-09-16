export const attentionItems = [
  {
    id: "ORD-1048",
    type: "Order",
    client: "EcoRetail Canarias",
    message: "2 days late",
    time: "Today",
    tone: "pink",
  },
  {
    id: "EMAIL-203",
    type: "Email",
    client: "Hotel Mar Azul",
    message: "26h unanswered",
    time: "Yesterday",
    tone: "lavender",
  },
  {
    id: "ORD-1052",
    type: "Order",
    client: "Bazar Norte SL",
    message: "Waiting for confirmation",
    time: "Today",
    tone: "cream",
  },
];

export const recentActivity = [
  {
    id: 1,
    time: "09:14",
    source: "Email",
    title: "New email from EcoRetail Canarias",
    description: "Re: Pedido ORD-1048 retrasado",
  },
  {
    id: 2,
    time: "09:16",
    source: "App",
    title: "Order marked as delayed",
    description: "ORD-1048 · EcoRetail Canarias",
  },
  {
    id: 3,
    time: "09:23",
    source: "App",
    title: "Internal note added",
    description: "Marta · Review with supplier",
  },
  {
    id: 4,
    time: "09:31",
    source: "App",
    title: "Shipping status updated",
    description: "ORD-1039 · Natura Home",
  },
  {
    id: 5,
    time: "09:46",
    source: "Email",
    title: "Client replied",
    description: "Bazar Norte SL · Stock request",
  },
];

export const syncBatches = [
  {
    count: 3,
    newEmails: 1,
    activities: [
      {
        id: 101,
        time: "10:02",
        source: "Email",
        title: "New email from Clínica Verde",
        description: "Solicitud factura septiembre",
      },
      {
        id: 102,
        time: "10:03",
        source: "App",
        title: "Order status updated",
        description: "ORD-1056 · Clínica Verde",
      },
      {
        id: 103,
        time: "10:04",
        source: "App",
        title: "CRM record updated",
        description: "Clínica Verde · Last interaction saved",
      },
    ],
  },
  {
    count: 2,
    newEmails: 1,
    activities: [
      {
        id: 201,
        time: "10:18",
        source: "Email",
        title: "New email from Natura Home",
        description: "Consulta sobre fecha de entrega",
      },
      {
        id: 202,
        time: "10:19",
        source: "App",
        title: "Delivery date updated",
        description: "ORD-1061 · Natura Home",
      },
    ],
  },
  {
    count: 4,
    newEmails: 2,
    activities: [
      {
        id: 301,
        time: "10:31",
        source: "Email",
        title: "New email from Urban Foods",
        description: "Nuevo pedido solicitado",
      },
      {
        id: 302,
        time: "10:32",
        source: "Email",
        title: "New email from Hotel Mar Azul",
        description: "Confirmación de dirección",
      },
      {
        id: 303,
        time: "10:33",
        source: "App",
        title: "New order created",
        description: "ORD-1068 · Urban Foods",
      },
      {
        id: 304,
        time: "10:34",
        source: "App",
        title: "Customer profile updated",
        description: "Hotel Mar Azul · Address confirmed",
      },
    ],
  },
];