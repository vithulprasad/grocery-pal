import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { useAppStore } from '@/stores/appStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const BasketPage = () => {
  const { baskets, updateBasketStatus } = useAppStore();
  const navigate = useNavigate();

  const started = baskets.filter((b) => b.status === 'started');
  const completed = baskets.filter((b) => b.status === 'completed');
  const cancelled = baskets.filter((b) => b.status === 'cancelled');

  const cancelBasket = (id: string) => {
    updateBasketStatus(id, 'cancelled');
    toast.success('Basket cancelled');
  };

  const renderBasket = (basket: typeof baskets[0], showActions = false) => (
    <div key={basket.id} className="grocery-card space-y-3">
      <div>
        <p className="font-bold text-foreground">{basket.grocery_name}</p>
        <p className="text-xs text-muted-foreground">🏪 {basket.store_name} • {basket.items.length} items</p>
        <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
          basket.status === 'started' ? 'bg-primary/15 text-primary' :
          basket.status === 'completed' ? 'bg-secondary text-secondary-foreground' :
          'bg-destructive/10 text-destructive'
        }`}>
          {basket.status}
        </span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => navigate(`/baskets/${basket.id}`)}>
          <Eye className="w-3.5 h-3.5 mr-1" /> View
        </Button>
        {showActions && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">Cancel</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Purchase?</AlertDialogTitle>
                <AlertDialogDescription>Are you sure you want to cancel this purchase? This action cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No, keep it</AlertDialogCancel>
                <AlertDialogAction onClick={() => cancelBasket(basket.id)}>Yes, cancel</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );

  return (
    <MainLayout title="Baskets">
      <div className="animate-fade-in">
        <Tabs defaultValue="started">
          <TabsList className="w-full">
            <TabsTrigger value="started" className="flex-1">Start ({started.length})</TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">Done ({completed.length})</TabsTrigger>
            <TabsTrigger value="cancelled" className="flex-1">Cancelled ({cancelled.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="started" className="space-y-3 mt-4">
            {started.length === 0 ? <p className="text-center py-8 text-muted-foreground">No active purchases 🛒</p> : started.map((b) => renderBasket(b, true))}
          </TabsContent>
          <TabsContent value="completed" className="space-y-3 mt-4">
            {completed.length === 0 ? <p className="text-center py-8 text-muted-foreground">No completed purchases ✅</p> : completed.map((b) => renderBasket(b))}
          </TabsContent>
          <TabsContent value="cancelled" className="space-y-3 mt-4">
            {cancelled.length === 0 ? <p className="text-center py-8 text-muted-foreground">No cancelled purchases ❌</p> : cancelled.map((b) => renderBasket(b))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default BasketPage;
