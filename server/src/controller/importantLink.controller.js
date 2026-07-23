const ImportantLink = require('../models/ImportantLink');

// Get all important links
exports.getAllLinks = async (req, res) => {
  try {
    const links = await ImportantLink.find({ active: true })
      .sort({ order: 1, createdAt: -1 })
      .select('title url isExternal order');
    
    res.status(200).json({
      success: true,
      count: links.length,
      links
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Error fetching important links:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not retrieve important links'
    });
  }
};

// Get all links (including inactive) for admin
exports.getAllLinksAdmin = async (req, res) => {
  try {
    const links = await ImportantLink.find()
      .sort({ order: 1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: links.length,
      links
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Error fetching important links for admin:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not retrieve important links'
    });
  }
};

// Get a single link by ID
exports.getLinkById = async (req, res) => {
  try {
    const link = await ImportantLink.findById(req.params.id);
    
    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Important link not found'
      });
    }
    
    res.status(200).json({
      success: true,
      link
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Error fetching important link by ID:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not retrieve the important link'
    });
  }
};

// Create a new link
exports.createLink = async (req, res) => {
  try {
    const { title, url, isExternal, order, active } = req.body;
    
    const link = await ImportantLink.create({
      title,
      url,
      isExternal,
      order,
      active
    });
    
    res.status(201).json({
      success: true,
      message: 'Important link created successfully',
      link
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Error creating important link:', error.message);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not create important link'
    });
  }
};

// Update a link
exports.updateLink = async (req, res) => {
  try {
    const { title, url, isExternal, order, active } = req.body;
    
    let link = await ImportantLink.findById(req.params.id);
    
    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Important link not found'
      });
    }
    
    link = await ImportantLink.findByIdAndUpdate(
      req.params.id,
      {
        title,
        url,
        isExternal,
        order,
        active,
        updatedAt: Date.now()
      },
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      message: 'Important link updated successfully',
      link
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Error updating important link:', error.message);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not update important link'
    });
  }
};

// Delete a link
exports.deleteLink = async (req, res) => {
  try {
    const link = await ImportantLink.findById(req.params.id);
    
    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Important link not found'
      });
    }
    
    await ImportantLink.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Important link deleted successfully'
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Error deleting important link:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not delete important link'
    });
  }
}; 