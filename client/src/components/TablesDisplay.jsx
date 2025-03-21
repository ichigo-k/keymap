import React from "react";
import ReactFlow, { Handle, Position, Controls } from "reactflow";
import "reactflow/dist/style.css";
import useProjectStore from "../store/projectStore";
import { motion } from "framer-motion";
import { Table, Lightbulb } from "lucide-react";

const TableNode = ({ data }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-opacity-80 border border-gray-300 shadow-lg p-4 rounded-xl w-52 backdrop-blur-md hover:shadow-xl"
        >
            <div className="flex items-center gap-2 mb-2">
                <Table className="text-blue-600" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">{data.label}</h3>
            </div>
            <ul className="text-sm text-gray-700">
                {data.columns.map((col, index) => (
                    <li key={index} className="border-t pt-1 mt-1">
                        <strong>{col.name}</strong>: {col.type}
                    </li>
                ))}
            </ul>
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-600" />
        </motion.div>
    );
};

const TablesDisplay = () => {
    const { tables } = useProjectStore();

    if (!tables?.length) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-[25rem] flex flex-col justify-center items-center text-center "
            >
                <Lightbulb className="text-yellow-500 animate-pulse" size={48} />
                <motion.h1
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl font-bold text-gray-800 "
                >
                    Welcome User!
                </motion.h1>
                <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-2 text-gray-600"
                >
                    What are you building today?
                </motion.p>
            </motion.div>
        );
    }

    const nodes = tables.map((table, index) => ({
        id: `table-${index}`,
        type: "custom",
        position: { x: index * 250, y: 50 },
        data: {
            label: table.name,
            columns: table.columns,
        },
    }));

    return (
        <section className="w-full h-[30rem] bg-gray-50 border rounded-lg shadow-lg p-6">
            <ReactFlow nodes={nodes} nodeTypes={{ custom: TableNode }} fitView>
                <Controls />
            </ReactFlow>
        </section>
    );
};

export default TablesDisplay;