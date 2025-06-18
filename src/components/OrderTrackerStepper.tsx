import React from 'react';
import { CheckCircle, Package, Truck, CookingPot, ShoppingBasket } from 'lucide-react'; // Example icons

interface Step {
  id: string;
  name: string;
  icon: React.ElementType;
  isCompleted: boolean;
  isActive: boolean;
}

interface OrderTrackerStepperProps {
  currentStatus: string; // e.g., "PLACED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"
  // Or pass steps directly if more flexible
  // steps?: Step[];
}

const OrderTrackerStepper: React.FC<OrderTrackerStepperProps> = ({ currentStatus }) => {
  console.log("Rendering OrderTrackerStepper, current status:", currentStatus);

  const definedSteps: Omit<Step, 'isCompleted' | 'isActive'>[] = [
    { id: "PLACED", name: "Order Placed", icon: ShoppingBasket },
    { id: "PREPARING", name: "Preparing", icon: CookingPot },
    { id: "OUT_FOR_DELIVERY", name: "Out for Delivery", icon: Truck },
    { id: "DELIVERED", name: "Delivered", icon: Package },
  ];

  const activeIndex = definedSteps.findIndex(step => step.id === currentStatus);

  const steps: Step[] = definedSteps.map((step, index) => ({
    ...step,
    isCompleted: activeIndex >= 0 && index < activeIndex,
    isActive: index === activeIndex,
  }));

  if (activeIndex === -1 && currentStatus) {
    console.warn("OrderTrackerStepper: Unknown status received - ", currentStatus);
    // Optionally handle unknown status, e.g., show only the first step or an error
  }


  return (
    <div className="w-full px-4 py-2">
      <div className="flex items-start">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2
                  ${step.isCompleted || step.isActive ? 'bg-green-500 border-green-500 text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}
                  ${step.isActive ? 'ring-2 ring-green-300 ring-offset-1' : ''}`}
              >
                {step.isCompleted ? <CheckCircle size={18} /> : <step.icon size={16} />}
              </div>
              <p className={`mt-1.5 text-xs text-center w-20 truncate ${step.isActive ? 'font-semibold text-green-600' : 'text-gray-500'}`}>
                {step.name}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-auto border-t-2 mt-[15px] 
                ${step.isCompleted ? 'border-green-500' : 'border-gray-300'}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OrderTrackerStepper;