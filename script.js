// Global state
let currentPage = 'home';
let formData = {
    name: '',
    email: '',
    phone: '',
    file: null,
    delivery: 'anytime',
    pages: 50,
    aiCheck: false
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize pricing calculator
    updatePricingCalculator();
    
    // Show home page by default
    showPage('home');
}

// Set up all event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            if (page) showPage(page);
        });
    });

    // File upload
    const fileInput = document.getElementById('file');
    const fileUpload = document.getElementById('file-upload');
    
    if (fileInput && fileUpload) {
        fileUpload.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', handleFileChange);
        
        // Drag and drop
        fileUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUpload.classList.add('dragover');
        });
        
        fileUpload.addEventListener('dragleave', () => {
            fileUpload.classList.remove('dragover');
        });
        
        fileUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUpload.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                handleFileChange({ target: { files } });
            }
        });
    }

    // Form submission
    const form = document.getElementById('submission-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Form inputs for pricing calculation
    const pagesSelect = document.getElementById('pages');
    const deliverySelect = document.getElementById('delivery');
    const aiCheckbox = document.getElementById('aiCheck');

    if (pagesSelect) {
        pagesSelect.addEventListener('change', (e) => {
            formData.pages = parseInt(e.target.value);
            updatePricingCalculator();
        });
    }

    if (deliverySelect) {
        deliverySelect.addEventListener('change', (e) => {
            formData.delivery = e.target.value;
            updatePricingCalculator();
        });
    }

    if (aiCheckbox) {
        aiCheckbox.addEventListener('change', (e) => {
            formData.aiCheck = e.target.checked;
            updatePricingCalculator();
        });
    }

    // Modal close handlers
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
}

// Page navigation
function showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    // Show selected page
    const pageElement = document.getElementById(page + '-page');
    if (pageElement) {
        pageElement.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-page="${page}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    currentPage = page;
    
    // Hide start check button on check page
    const headerActions = document.querySelector('.header-actions');
    const startCheckBtn = headerActions?.querySelector('.btn-hero');
    if (startCheckBtn) {
        startCheckBtn.style.display = page === 'check' ? 'none' : 'inline-flex';
    }
}

// Handle file upload
function handleFileChange(e) {
    const file = e.target.files[0];
    const fileUpload = document.getElementById('file-upload');
    const uploadIcon = document.querySelector('.upload-icon');
    const uploadText = document.querySelector('.upload-text');
    const uploadSuccess = document.querySelector('.upload-success');
    
    if (file) {
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (validTypes.includes(file.type)) {
            formData.file = file;
            fileUpload.classList.add('has-file');
            uploadText.textContent = file.name;
            uploadSuccess.style.display = 'block';
            
            showToast('File uploaded successfully', 'File ready for processing', 'success');
        } else {
            showToast('Invalid file type', 'Please upload a PDF or DOCX file.', 'error');
            e.target.value = '';
        }
    }
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const form = e.target;
    const formDataObj = new FormData(form);
    
    formData.name = formDataObj.get('name');
    formData.email = formDataObj.get('email');
    formData.phone = formDataObj.get('phone');
    formData.delivery = formDataObj.get('delivery');
    formData.pages = parseInt(formDataObj.get('pages'));
    formData.aiCheck = formDataObj.get('aiCheck') === 'on';
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.file) {
        showToast('Missing information', 'Please fill in all required fields and upload a document.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showToast('Invalid email', 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{7,14}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        showToast('Invalid phone number', 'Please enter a valid phone number.', 'error');
        return;
    }
    
    // Start submission process
    const submitBtn = document.getElementById('submit-btn');
    const originalContent = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <div style="width: 1rem; height: 1rem; border: 2px solid white; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.5rem;"></div>
        Processing...
    `;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Prepare data for submission to phone number 9699925064
        const submissionData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            fileName: formData.file.name,
            fileSize: (formData.file.size / 1024 / 1024).toFixed(2) + ' MB',
            pages: formData.pages,
            delivery: formData.delivery,
            aiCheck: formData.aiCheck,
            totalCost: calculateTotalCost(),
            timestamp: new Date().toLocaleString()
        };
        
        // In a real application, you would send this data to your backend
        console.log('Submission data to be sent to 9699925064:', submissionData);
        
        // Show success message
        showToast('Document submitted successfully!', 'We\'ve received your document and will process it according to your delivery preference.', 'success');
        
        // Show confirmation modal
        showConfirmationModal(submissionData);
        
        // Reset form
        form.reset();
        formData.file = null;
        const fileUpload = document.getElementById('file-upload');
        fileUpload.classList.remove('has-file');
        document.querySelector('.upload-text').textContent = 'Click to upload or drag and drop your document';
        document.querySelector('.upload-success').style.display = 'none';
        
    } catch (error) {
        showToast('Submission failed', 'There was an error submitting your document. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }
}

// Calculate pricing
function calculateTotalCost() {
    let ratePerPage = 2.0; // Default rate
    
    // Determine rate based on page count
    if (formData.pages <= 100) {
        ratePerPage = 2.0;
    } else if (formData.pages <= 500) {
        ratePerPage = 1.5;
    } else {
        ratePerPage = 1.0;
    }
    
    let baseCost = formData.pages * ratePerPage;
    
    // Apply delivery multiplier
    let deliveryMultiplier = 1.0;
    if (formData.delivery === 'immediate') {
        deliveryMultiplier = 1.5;
    } else if (formData.delivery === '1day') {
        deliveryMultiplier = 1.2;
    }
    
    let totalCost = baseCost * deliveryMultiplier;
    
    // Add AI check cost
    if (formData.aiCheck) {
        totalCost += 39;
    }
    
    return totalCost;
}

// Update pricing calculator
function updatePricingCalculator() {
    const calcPages = document.getElementById('calc-pages');
    const calcRate = document.getElementById('calc-rate');
    const calcBase = document.getElementById('calc-base');
    const calcDelivery = document.getElementById('calc-delivery');
    const calcAi = document.getElementById('calc-ai');
    const calcTotal = document.getElementById('calc-total');
    
    if (!calcPages) return;
    
    let ratePerPage = 2.0;
    if (formData.pages <= 100) {
        ratePerPage = 2.0;
    } else if (formData.pages <= 500) {
        ratePerPage = 1.5;
    } else {
        ratePerPage = 1.0;
    }
    
    const baseCost = formData.pages * ratePerPage;
    
    let deliveryMultiplier = 1.0;
    let deliveryText = '1.0x';
    if (formData.delivery === 'immediate') {
        deliveryMultiplier = 1.5;
        deliveryText = '1.5x';
    } else if (formData.delivery === '1day') {
        deliveryMultiplier = 1.2;
        deliveryText = '1.2x';
    }
    
    const adjustedCost = baseCost * deliveryMultiplier;
    const aiCost = formData.aiCheck ? 39 : 0;
    const totalCost = adjustedCost + aiCost;
    
    calcPages.textContent = formData.pages;
    calcRate.textContent = `₹${ratePerPage.toFixed(2)}`;
    calcBase.textContent = `₹${baseCost.toFixed(2)}`;
    calcDelivery.textContent = deliveryText;
    calcAi.textContent = `₹${aiCost.toFixed(2)}`;
    calcTotal.textContent = `₹${totalCost.toFixed(2)}`;
}

// Show confirmation modal
function showConfirmationModal(data) {
    const modal = document.getElementById('confirmation-modal');
    const details = document.getElementById('submission-details');
    
    details.innerHTML = `
        <div style="margin-top: 1rem; padding: 1rem; background: hsl(var(--muted)); border-radius: var(--radius);">
            <h4 style="margin-bottom: 0.5rem; font-weight: 600;">Submission Details:</h4>
            <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>File:</strong> ${data.fileName} (${data.fileSize})</p>
                <p><strong>Pages:</strong> ${data.pages}</p>
                <p><strong>Delivery:</strong> ${data.delivery}</p>
                <p><strong>AI Check:</strong> ${data.aiCheck ? 'Yes' : 'No'}</p>
                <p><strong>Total Cost:</strong> ₹${data.totalCost.toFixed(2)}</p>
                <p><strong>Submitted:</strong> ${data.timestamp}</p>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('confirmation-modal');
    modal.classList.remove('show');
}

// Show toast notification
function showToast(title, description, type = 'success') {
    const container = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-description">${description}</div>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 5000);
    
    // Click to remove
    toast.addEventListener('click', () => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    });
}

// Add CSS for spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);