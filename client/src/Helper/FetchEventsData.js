const FetchEventsData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SERVERURL + '/api/v1/event/all');
           
            if (!response.ok) {
                throw new Error(`Failed to fetch events: ${response.status}`);
            }

            const data = await response.json();
            resolve({
                data: data.events,
                success: true
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            reject({
                message: error.message,
                success: false
            });
        }
    })
}

export default FetchEventsData;
