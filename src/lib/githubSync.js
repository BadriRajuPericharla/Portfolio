// GitHub API Direct Sync Service
// Allows the Admin Panel to commit files and images directly to GitHub
// Repository: BadriRajuPericharla/Portfolio

const GITHUB_REPO_OWNER = 'BadriRajuPericharla';
const GITHUB_REPO_NAME = 'Portfolio';
const TOKEN_STORAGE_KEY = 'badri_github_pat';

export const getGitHubToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
};

export const saveGitHubToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token.trim());
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
};

export const isGitHubTokenConfigured = () => {
  return Boolean(getGitHubToken());
};

// Helper to convert UTF-8 string to base64 reliably in browser
const utf8ToBase64 = (str) => {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
};

/**
 * Uploads or updates any file in the GitHub repository on branch `main`
 */
export const commitFileToGitHub = async (path, contentBase64, commitMessage = 'Update file via Admin Panel') => {
  const token = getGitHubToken();
  if (!token) {
    throw new Error('GitHub Personal Access Token is missing. Please add your token in the GitHub Sync tab.');
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${path}`;

  // 1. Check if the file already exists to get its current SHA
  let existingSha = null;
  try {
    const getRes = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (getRes.ok) {
      const fileData = await getRes.json();
      existingSha = fileData.sha;
    }
  } catch (err) {
    console.warn('Could not fetch existing file SHA, will attempt create:', err);
  }

  // 2. Commit the file (PUT request)
  const bodyPayload = {
    message: commitMessage,
    content: contentBase64,
    branch: 'main'
  };

  if (existingSha) {
    bodyPayload.sha = existingSha;
  }

  const putRes = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyPayload)
  });

  if (!putRes.ok) {
    const errData = await putRes.json().catch(() => ({}));
    throw new Error(errData.message || `GitHub API error: ${putRes.status} ${putRes.statusText}`);
  }

  return await putRes.json();
};

/**
 * Commits the entire projectsData.js file to GitHub
 */
export const publishProjectsDataToGitHub = async (projects) => {
  const fileContent = `export const projectsData = ${JSON.stringify(projects, null, 2)};\n`;
  const base64Content = utf8ToBase64(fileContent);
  return await commitFileToGitHub(
    'src/data/projectsData.js',
    base64Content,
    'Update projects via Admin Panel'
  );
};

/**
 * Commits an image directly into public/projects/<projectId>.png
 */
export const uploadProjectImageToGitHub = async (projectId, fileOrBase64) => {
  let base64Data = '';

  if (typeof fileOrBase64 === 'string') {
    if (fileOrBase64.startsWith('http://') || fileOrBase64.startsWith('https://')) {
      const response = await fetch(fileOrBase64);
      if (!response.ok) throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
      const blob = await response.blob();
      base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const res = reader.result;
          resolve(res.replace(/^data:image\/\w+;base64,/, ''));
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } else {
      // Already base64 or DataURL
      base64Data = fileOrBase64.replace(/^data:image\/\w+;base64,/, '');
    }
  } else if (fileOrBase64 instanceof File || fileOrBase64 instanceof Blob) {
    base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = reader.result;
        resolve(res.replace(/^data:image\/\w+;base64,/, ''));
      };
      reader.onerror = reject;
      reader.readAsDataURL(fileOrBase64);
    });
  } else {
    throw new Error('Invalid image format provided for upload');
  }

  const extension = 'png';
  const filePath = `public/projects/${projectId}.${extension}`;

  return await commitFileToGitHub(
    filePath,
    base64Data,
    `Upload game cover for ${projectId}`
  );
};
