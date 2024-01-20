addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    const url = new URL(request.url);
    const path = url.pathname;
  
    switch (path) {
      case '/api/courses':
        return handleCourses(request);
      case '/api/homework':
        return handleHomework(request);
      // Add other endpoint cases as needed
      default:
        return new Response('Endpoint not found', { status: 404 });
    }
  }
  
  async function handleCourses(request) {
    switch (request.method) {
      case 'GET':
        return getCourses();
      case 'POST':
        return addCourse(request);
      // Implement other methods (PUT, DELETE) as needed
      default:
        return new Response('Method Not Allowed', { status: 405 });
    }
  }
  
  async function handleHomework(request) {
    // Implement homework-related logic similar to courses
  }
  
  async function getCourses() {
    const data = await AGGIE_ACCOUNTS.get('courses', 'json');
    return new Response(JSON.stringify(data), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  async function addCourse(request) {
    const courseData = await request.json();
    let courses = await AGGIE_ACCOUNTS.get('courses', 'json');
    courses = courses ? courses : [];
    courses.push(courseData);
    await AGGIE_ACCOUNTS.put('courses', JSON.stringify(courses));
    return new Response('Course added', { status: 200 });
  }
  
  // Implement similar functions for homework and other data
  