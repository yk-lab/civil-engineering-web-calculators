import uuid4 from 'uuid4';

export type Notification = {
  id: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  title: string;
  description?: string | null;
  icon?: string | null;
  timeout?: number;
  click?: (notification: Notification) => void;
};

type NotificationBody = Omit<Notification, 'id'>;

export default function () {
  const getLast = (state: Ref<Notification[]>) => {
    return () => state.value[state.value.length - 1];
  };

  const remove = (state: Ref<Notification[]>) => {
    return (id: string) =>
      (state.value = state.value.filter((m) => m.id !== id));
  };

  const add = (state: Ref<Notification[]>) => {
    return (notification: NotificationBody) => {
      const body = {
        id: uuid4(),
        ...notification,
      };

      state.value.push(body);

      return body;
    };
  };

  const notifications = useState<Notification[]>(
    'notifications_state',
    () => [],
  );

  return {
    notifications: readonly(notifications),
    getLast: getLast(notifications),
    remove: remove(notifications),
    add: add(notifications),
  };
}
