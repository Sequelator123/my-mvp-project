export const validOrders = [
  {
    employee_name: 'Alice Johnson',
    order_item: 'Caesar Salad with grilled chicken',
    dietary_notes: 'No croutons please',
  },
  {
    employee_name: 'Bob Smith',
    order_item: 'Turkey club sandwich with fries',
    dietary_notes: 'Extra mayo',
  },
  {
    employee_name: 'Carol Davis',
    order_item: 'Vegetarian pasta primavera',
    dietary_notes: 'Vegan - no cheese or dairy',
  },
];

export const edgeCaseOrders = [
  {
    employee_name: 'José García-Martínez',
    order_item: 'Spicy jalapeño burger with "extra cheese" & special sauce (medium-rare)',
    dietary_notes: 'Allergies: nuts, shellfish. Prefer gluten-free bun if available.',
  },
  {
    employee_name: 'A'.repeat(100), // Very long name
    order_item: 'B'.repeat(500), // Very long order
    dietary_notes: 'C'.repeat(200), // Very long notes
  },
  {
    employee_name: '李小明',
    order_item: 'Sushi & sashimi combo 🍣',
    dietary_notes: 'No wasabi 🌶️',
  },
];

export const invalidOrders = [
  {
    employee_name: '',
    order_item: 'Valid order',
    dietary_notes: '',
    error: 'Name is required',
  },
  {
    employee_name: 'Valid Name',
    order_item: '',
    dietary_notes: '',
    error: 'Order is required',
  },
];

export const mockApiResponses = {
  success: {
    id: 'test-id-123',
    employee_name: 'Test User',
    order_item: 'Test Order',
    dietary_notes: 'Test Notes',
    order_date: '2025-09-19',
    status: 'pending',
    created: '2025-09-19T10:00:00.000Z',
    updated: '2025-09-19T10:00:00.000Z',
  },
  orders: [
    {
      id: '1',
      employee_name: 'Alice',
      order_item: 'Salad',
      dietary_notes: 'Vegan',
      order_date: '2025-09-19',
      status: 'pending',
      created: '2025-09-19T09:00:00.000Z',
      updated: '2025-09-19T09:00:00.000Z',
    },
    {
      id: '2',
      employee_name: 'Bob',
      order_item: 'Sandwich',
      dietary_notes: 'No mayo',
      order_date: '2025-09-19',
      status: 'confirmed',
      created: '2025-09-19T09:30:00.000Z',
      updated: '2025-09-19T09:30:00.000Z',
    },
  ],
};