export const Card = ({ children }) => (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">{children}</div>
  );
  
  export const CardContent = ({ children }) => (
    <div className="text-gray-700 text-sm">{children}</div>
  );
  
  export const CardHeader = ({ children }) => (
    <div className="mb-2">{children}</div> 
  );
  
  export const CardTitle = ({ title, children }) => (
    <h3 className="text-lg font-medium text-gray-800">{title || children}</h3>
  );
  