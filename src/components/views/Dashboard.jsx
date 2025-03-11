import { h } from 'preact';
import LibraryTest from '../utils/LibraryTest';

export function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      {/* Library Test Component */}
      <div className="w-full max-w-md mb-6">
        <LibraryTest />
      </div>

      <p className="text-gray-500 mb-2">Coming Soon</p>
      <p className="text-sm text-gray-400 text-center">
        Your wallet balance and recent transactions will appear here
      </p>
    </div>
  );
}

export default Dashboard;

// import { h } from 'preact';

// export function Dashboard() {
//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <h2 className="text-xl font-bold mb-4">Dashboard</h2>
//       <p className="text-gray-500 mb-2">Coming Soon</p>
//       <p className="text-sm text-gray-400 text-center">
//         Your wallet balance and recent transactions will appear here
//       </p>
//     </div>
//   );
// }

// export default Dashboard;
