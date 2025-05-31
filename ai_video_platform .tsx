import React, { useState, useRef } from 'react';
import { Upload, Play, Download, Mic, Video, Image, FileText, Wand2, Settings, Check } from 'lucide-react';

const AIVideoCreationPlatform = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState({
    avatar: null,
    script: '',
    audioFile: null,
    videoSettings: {
      resolution: '1080p',
      duration: 60,
      style: 'professional'
    },
    generatedContent: {
      avatar: null,
      audio: null,
      video: null,
      finalVideo: null
    }
  });
  
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const steps = [
    { id: 1, title: 'Avatar Creation', icon: Image, desc: 'Create or select your AI avatar' },
    { id: 2, title: 'Script Generation', icon: FileText, desc: 'Generate or input your script' },
    { id: 3, title: 'Audio Generation', icon: Mic, desc: 'Create voice audio from script' },
    { id: 4, title: 'Video Production', icon: Video, desc: 'Generate avatar video with audio sync' },
    { id: 5, title: 'Post Production', icon: Wand2, desc: 'Add background music and captions' },
    { id: 6, title: 'Download', icon: Download, desc: 'Download your finished video' }
  ];

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'avatar') {
          setProjectData(prev => ({
            ...prev,
            avatar: { file, preview: e.target.result, type: 'uploaded' }
          }));
        } else if (type === 'video') {
          setProjectData(prev => ({
            ...prev,
            sourceVideo: { file, preview: e.target.result }
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAvatar = async (style) => {
    setProcessing(true);
    setProcessingStep('Generating AI Avatar...');
    
    // Simulate AI avatar generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setProjectData(prev => ({
      ...prev,
      avatar: { 
        type: 'generated', 
        style, 
        preview: '/api/placeholder/300/400',
        id: `avatar_${Date.now()}`
      }
    }));
    
    setProcessing(false);
    setCurrentStep(2);
  };

  const generateScript = async (prompt) => {
    setProcessing(true);
    setProcessingStep('Generating Script with AI...');
    
    // Simulate script generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedScript = `Welcome to our innovative platform! Today, we're excited to share how artificial intelligence is transforming video creation. 

Our cutting-edge technology enables anyone to create professional-quality videos without extensive editing skills. From avatar generation to voice synthesis, every aspect is powered by advanced AI algorithms.

Whether you're creating marketing content, educational materials, or entertainment videos, our platform streamlines the entire production process. The future of content creation is here, and it's more accessible than ever before.

Thank you for joining us on this exciting journey into the world of AI-powered video production.`;
    
    setProjectData(prev => ({
      ...prev,
      script: generatedScript
    }));
    
    setProcessing(false);
  };

  const generateAudio = async () => {
    setProcessing(true);
    setProcessingStep('Converting Script to Audio...');
    
    // Simulate audio generation
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setProjectData(prev => ({
      ...prev,
      generatedContent: {
        ...prev.generatedContent,
        audio: {
          url: '/api/placeholder/audio',
          duration: 45,
          waveform: Array.from({length: 50}, () => Math.random() * 100)
        }
      }
    }));
    
    setProcessing(false);
    setCurrentStep(4);
  };

  const generateVideo = async () => {
    setProcessing(true);
    setProcessingStep('Creating Avatar Video...');
    
    // Simulate video generation steps
    const steps = [
      'Analyzing script timing...',
      'Generating lip-sync animation...',
      'Rendering avatar movements...',
      'Synchronizing audio...',
      'Applying visual enhancements...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i]);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    setProjectData(prev => ({
      ...prev,
      generatedContent: {
        ...prev.generatedContent,
        video: {
          url: '/api/placeholder/video',
          thumbnail: '/api/placeholder/640/360',
          duration: 45
        }
      }
    }));
    
    setProcessing(false);
    setCurrentStep(5);
  };

  const addPostProduction = async () => {
    setProcessing(true);
    setProcessingStep('Adding Final Touches...');
    
    const postSteps = [
      'Adding background music...',
      'Generating captions...',
      'Color correction...',
      'Final rendering...'
    ];
    
    for (let i = 0; i < postSteps.length; i++) {
      setProcessingStep(postSteps[i]);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setProjectData(prev => ({
      ...prev,
      generatedContent: {
        ...prev.generatedContent,
        finalVideo: {
          url: '/api/placeholder/final-video',
          thumbnail: '/api/placeholder/640/360',
          duration: 47,
          size: '15.2 MB',
          resolution: '1920x1080'
        }
      }
    }));
    
    setProcessing(false);
    setCurrentStep(6);
  };

  const downloadVideo = async () => {
    if (!projectData.generatedContent.finalVideo) {
      alert('No video available for download');
      return;
    }

    try {
      // Create a sample text file that represents the video metadata (demo version)
      // In production, this would be your actual video file blob
      const videoMetadata = {
        title: "AI Generated Video",
        platform: "AI VIDEO DEVELOPMENT STUDIO",
        timestamp: new Date().toISOString(),
        settings: {
          resolution: projectData.generatedContent.finalVideo.resolution,
          duration: projectData.generatedContent.finalVideo.duration + 's',
          size: projectData.generatedContent.finalVideo.size
        },
        avatar: projectData.avatar?.type || 'Generated',
        script: projectData.script.substring(0, 200) + '...',
        note: "This is a demo file. In production, this would be your actual MP4 video file."
      };

      // Create a downloadable file with video information
      const jsonContent = JSON.stringify(videoMetadata, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      
      // Create and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-video-${Date.now()}.json`;
      
      // Ensure the link is properly configured
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Show success message
      alert('Demo video metadata downloaded! In production, this would be your actual MP4 video file.');
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">AI VIDEO DEVELOPMENT STUDIO</h1>
          <p className="text-xl text-purple-200">Complete automated video production pipeline</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isCompleted ? 'bg-green-500' : isActive ? 'bg-purple-600' : 'bg-gray-600'
                  }`}>
                    {isCompleted ? <Check className="w-6 h-6 text-white" /> : <Icon className="w-6 h-6 text-white" />}
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-purple-300' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Processing Overlay */}
        {processing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4">
              <div className="text-center">
                <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Processing...</h3>
                <p className="text-gray-600">{processingStep}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Step 1: Avatar Creation</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Upload Your Image</h3>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Click to upload image for avatar creation</p>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'avatar')}
                      className="hidden"
                    />
                  </div>
                  {projectData.avatar?.preview && (
                    <div className="mt-4">
                      <img src={projectData.avatar.preview} alt="Avatar preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Continue with This Avatar
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Or Generate AI Avatar</h3>
                  <div className="space-y-3">
                    {['Professional', 'Casual', 'Creative', 'Corporate'].map((style) => (
                      <button
                        key={style}
                        onClick={() => generateAvatar(style)}
                        className="w-full p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left"
                      >
                        <span className="font-medium">{style} Style</span>
                        <p className="text-sm text-gray-600">Generate a {style.toLowerCase()} avatar using AI</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Step 2: Script Generation</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Script Topic or Prompt</label>
                  <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg resize-none"
                    rows={3}
                    placeholder="Describe what you want your video to be about..."
                  />
                  <button
                    onClick={() => generateScript('AI video creation')}
                    className="mt-3 bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Generate Script with AI
                  </button>
                </div>
                
                {projectData.script && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Generated Script</label>
                    <textarea
                      className="w-full p-4 border border-gray-300 rounded-lg resize-none"
                      rows={8}
                      value={projectData.script}
                      onChange={(e) => setProjectData(prev => ({ ...prev, script: e.target.value }))}
                    />
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="mt-3 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Continue to Audio Generation
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Step 3: Audio Generation</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Script Preview</h3>
                  <p className="text-gray-700 text-sm">{projectData.script.substring(0, 200)}...</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Voice Settings</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <select className="p-3 border border-gray-300 rounded-lg">
                      <option>Professional Male</option>
                      <option>Professional Female</option>
                      <option>Casual Male</option>
                      <option>Casual Female</option>
                    </select>
                    <select className="p-3 border border-gray-300 rounded-lg">
                      <option>Normal Speed</option>
                      <option>Slow Speed</option>
                      <option>Fast Speed</option>
                    </select>
                    <select className="p-3 border border-gray-300 rounded-lg">
                      <option>Neutral Tone</option>
                      <option>Enthusiastic</option>
                      <option>Calm</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={generateAudio}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Generate Audio from Script
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Step 4: Video Production</h2>
              <div className="space-y-6">
                {projectData.generatedContent.audio && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-green-800">Audio Generated Successfully</h3>
                    <div className="flex items-center space-x-4">
                      <Play className="w-8 h-8 text-green-600" />
                      <div className="flex-1">
                        <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-1/3"></div>
                        </div>
                        <p className="text-sm text-green-700 mt-1">Duration: {projectData.generatedContent.audio.duration}s</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-4">Video Generation Settings</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Background</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg">
                        <option>Professional Office</option>
                        <option>Modern Studio</option>
                        <option>Green Screen</option>
                        <option>Custom Background</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Camera Angle</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg">
                        <option>Centered Portrait</option>
                        <option>Slight Left</option>
                        <option>Slight Right</option>
                        <option>Close-up</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateVideo}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Generate Avatar Video
                </button>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Step 5: Post Production</h2>
              <div className="space-y-6">
                {projectData.generatedContent.video && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-800">Video Generated Successfully</h3>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <Play className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-4">Enhancement Options</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span>Add background music</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span>Generate automatic captions</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span>Add intro/outro animations</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span>Apply color correction</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={addPostProduction}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Apply Final Enhancements
                </button>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Step 6: Download Your Video</h2>
              <div className="text-center space-y-6">
                {projectData.generatedContent.finalVideo && (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Video Ready!</h3>
                    <p className="text-green-700 mb-4">Your AI-generated video has been successfully created</p>
                    
                    <div className="bg-white p-4 rounded-lg inline-block">
                      <div className="aspect-video w-64 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        <div className="relative z-10 text-center text-white">
                          <Play className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm font-medium">AI Generated Video</p>
                          <p className="text-xs opacity-80">Click download to save</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Duration: {projectData.generatedContent.finalVideo.duration}s</p>
                        <p>Size: {projectData.generatedContent.finalVideo.size}</p>
                        <p>Resolution: {projectData.generatedContent.finalVideo.resolution}</p>
                        <p className="text-green-600 font-medium">✓ Ready for download</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={downloadVideo}
                    disabled={!projectData.generatedContent.finalVideo}
                    className={`py-3 px-8 rounded-lg transition-colors flex items-center ${
                      projectData.generatedContent.finalVideo 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {projectData.generatedContent.finalVideo ? 'Download Video (Demo)' : 'Video Not Ready'}
                  </button>
                  
                  {projectData.generatedContent.finalVideo && (
                    <button
                      onClick={() => {
                        const videoData = `# AI VIDEO DEVELOPMENT STUDIO
Generated Video Report

**Video Details:**
- Resolution: ${projectData.generatedContent.finalVideo.resolution}
- Duration: ${projectData.generatedContent.finalVideo.duration}s  
- Size: ${projectData.generatedContent.finalVideo.size}
- Created: ${new Date().toLocaleString()}

**Avatar:** ${projectData.avatar?.type || 'Generated'}
**Script Preview:** ${projectData.script.substring(0, 150)}...

**Note:** This is a demo version. In production, you would receive an actual MP4 video file.`;
                        
                        navigator.clipboard.writeText(videoData).then(() => {
                          alert('Video information copied to clipboard!');
                        }).catch(() => {
                          alert('Copy failed - please use download button instead');
                        });
                      }}
                      className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      📋 Copy Info
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setProjectData({
                        avatar: null,
                        script: '',
                        audioFile: null,
                        videoSettings: {
                          resolution: '1080p',
                          duration: 60,
                          style: 'professional'
                        },
                        generatedContent: {
                          avatar: null,
                          audio: null,
                          video: null,
                          finalVideo: null
                        }
                      });
                    }}
                    className="bg-purple-600 text-white py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Create New Video
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIVideoCreationPlatform;