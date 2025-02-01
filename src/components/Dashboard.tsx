import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    RootState,
    setWidgetsOrder,
    loadWidgetsOrder,
    WidgetType,
} from '../store';

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';

import ChartWidget from './widgets/ChartWidget';
import CalendarWidget from './widgets/CalendarWidget';
import TableWidget from './widgets/TableWidget';
import ListWidget from './widgets/ListWidget';

const widgetComponents: Record<WidgetType, React.ReactNode> = {
    'Chart': <ChartWidget />,
    'Calendar': <CalendarWidget />,
    'Table': <TableWidget />,
    'List': <ListWidget />,
};

import SortableItem from './SortableItem';

const Dashboard = () => {
    const dispatch = useDispatch();
    const widgetsOrder = useSelector((state: RootState) => state.dashboard.widgetsOrder);

    useEffect(() => {
        dispatch(loadWidgetsOrder());
    }, [dispatch]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = widgetsOrder.indexOf(active.id as WidgetType);
            const newIndex = widgetsOrder.indexOf(over.id as WidgetType);
            const newOrder = arrayMove(widgetsOrder, oldIndex, newIndex);
            dispatch(setWidgetsOrder(newOrder));
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={widgetsOrder} strategy={rectSortingStrategy}>
                <div className="p-4 space-y-4">
                    {widgetsOrder.map((widget) => (
                        <SortableItem key={widget} id={widget}>
                            {widgetComponents[widget]}
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default Dashboard;
