import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { useAppStore } from '@/stores/appStore';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import { emitSocketEvent, socketEvents } from '@/socket/socket';



const BasketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { baskets, toggleBasketItem, updateBasketStatus } = useAppStore();
  const navigate = useNavigate();
  const basket = baskets.find((b) => b.id === id);

  if (!basket) return <MainLayout title="Basket"><p className="text-muted-foreground">Not found</p></MainLayout>;

  const myItems = basket.items.filter((i) => i.assign_to === 'me');
  const partnerItems = basket.items.filter((i) => i.assign_to === 'partner');
  const allCompleted = basket.items.every((i) => i.completed);

  const handleToggle = (productId: string) => {
    toggleBasketItem(basket.id, productId);
    const item = basket.items.find((i) => i.product_id === productId);
    if (item && !item.completed) {
      emitSocketEvent(socketEvents.PRODUCT_COMPLETED, { basketId: basket.id, productId });
      toast.success(`${item.product_name} completed ✅`);
    }
  };

  const completePurchase = () => {
    updateBasketStatus(basket.id, 'completed');
    toast.success('Purchase completed! 🎉');
    navigate('/baskets');
  };

  const renderItem = (item: typeof basket.items[0]) => (
    <div key={item.product_id} className={`grocery-card flex items-center gap-3 ${item.completed ? 'opacity-60' : ''}`}>
      <Checkbox checked={item.completed} onCheckedChange={() => handleToggle(item.product_id)} disabled={basket.status !== 'started'} />
      <div className="flex-1">
        <p className={`font-semibold text-foreground ${item.completed ? 'line-through' : ''}`}>{item.product_name}</p>
        <p className="text-xs text-muted-foreground">{item.quantity} {item.unit}</p>
      </div>
      {item.completed && <Check className="w-4 h-4 text-primary" />}
    </div>
  );

  return (
    <MainLayout title="Basket Details">
      <div className="animate-fade-in space-y-4">
        <button onClick={() => navigate('/baskets')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grocery-card grocery-gradient text-primary-foreground">
          <h2 className="text-lg font-bold">{basket.grocery_name}</h2>
          <p className="text-primary-foreground/80 text-sm">🏪 {basket.store_name}</p>
        </div>

        {/* My Items */}
        <div>
          <h3 className="font-bold text-foreground mb-2">👤 My Items ({myItems.filter(i => i.completed).length}/{myItems.length})</h3>
          <div className="space-y-2">
            {myItems.map(renderItem)}
            {myItems.length === 0 && <p className="text-sm text-muted-foreground">No items assigned to you</p>}
          </div>
        </div>

        {/* Partner Items */}
        <div>
          <h3 className="font-bold text-foreground mb-2">👥 Partner Items ({partnerItems.filter(i => i.completed).length}/{partnerItems.length})</h3>
          <div className="space-y-2">
            {partnerItems.map(renderItem)}
            {partnerItems.length === 0 && <p className="text-sm text-muted-foreground">No items assigned to partner</p>}
          </div>
        </div>

        {basket.status === 'started' && allCompleted && basket.items.length > 0 && (
          <Button onClick={completePurchase} className="w-full">
            Complete Purchase 🎉
          </Button>
        )}
      </div>
    </MainLayout>
  );
};

export default BasketDetails;
