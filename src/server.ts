const products = [
    { id: 1, name: "Laptop", price: 15000000 },
    { id: 2, name: "Mouse", price: 250000 },
    { id: 3, name: "Keyboard", price: 750000 }
];

const server = Bun.serve({
    port: 3000,
    fetch(request) {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;
        const pathSegments = path.split("/");
        
        console.log(`[${new Date().toLocaleTimeString()}] ${method} ${path}`);

        if (path === '/' && method === 'GET') {
            return new Response('<h1>Halaman Utama (Bun)</h1><p>Selamat datang di server Bun + TypeScript!</p>', {
                headers: { 'Content-Type': 'text/html' },
            });
        }
        else if (path === '/about' && method === 'GET') {
            return new Response(`<h1>Tentang Kami (Bun)</h1><p>Routing manual dengan Bun sangat mudah! </p>`, {
                headers: { 'Content-Type': 'text/html' },
            });
        }
        
        else if (path === '/api/users' && method === 'GET') {
            return new Response(JSON.stringify([
                { id: 1, name: 'Alice' },
                { id: 2, name: 'Bob' }
            ]), {
                headers: { 'Content-Type': 'application/json' },
            });
        }
        else if (path === '/api/users' && method === 'POST') {
            return new Response(JSON.stringify({
                message: 'User berhasil dibuat (Bun)' 
            }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
        if (path === '/products' && method === 'GET') {
            return new Response(JSON.stringify(products), {
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (pathSegments[1] === 'products' && pathSegments[2] && method === 'GET') {
            const id = parseInt(pathSegments[2]);
            const product = products.find(p => p.id === id);

            if (product) {
                return new Response(JSON.stringify(product), {
                    headers: { 'Content-Type': 'application/json' },
                });
            } else {
                return new Response(JSON.stringify({ message: "Produk tidak ditemukan" }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        else {
            return new Response('<h1>404 - Halaman Tidak Ditemukan (Bun)</h1>', {
                status: 404,
                headers: { 'Content-Type': 'text/html' },
            });
        }
    },
});

console.log(`🚀 Server Bun berjalan di http://localhost:${server.port}`);