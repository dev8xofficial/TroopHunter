
      export default function TestComponent() {
        return (
          <div className="p-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Hover Me
            </button>
            <input 
              type="text" 
              className="mt-4 p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Focus Me"
            />
          </div>
        );
      }
    