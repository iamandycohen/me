import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const dataPath = join(process.cwd(), 'content', 'data.json');
    const data = JSON.parse(readFileSync(dataPath, 'utf8'));
    
    const markdown = generateMarkdown(data);
    
    return new NextResponse(markdown, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new NextResponse('Error generating LLM content', { status: 500 });
  }
}

function generateMarkdown(data: any): string {
  let md = `# ${data.contact?.name || 'Professional Portfolio'}\n\n`;
  md += `*Complete professional profile for AI consumption*\n\n`;

  // Contact Information
  if (data.contact) {
    md += `## Contact Information\n\n`;
    md += `**Name:** ${data.contact.name}\n`;
    md += `**Email:** ${data.contact.email}\n`;
    md += `**LinkedIn:** ${data.contact.linkedin}\n`;
    md += `**Location:** ${data.contact.location}\n\n`;
  }

  // Biography
  if (data.bio) {
    md += `## Biography\n\n`;
    if (data.bio.short) {
      md += `### Professional Summary\n\n${data.bio.short}\n\n`;
    }
    if (data.bio.full) {
      md += `### Complete Background\n\n${data.bio.full}\n\n`;
    }
  }

  // Professional Profile
  if (data.professional) {
    md += `## Professional Profile\n\n`;
    
    if (data.professional.expertise?.length) {
      md += `### Core Expertise\n\n`;
      data.professional.expertise.forEach((item: string) => {
        md += `- ${item}\n`;
      });
      md += `\n`;
    }
    
    if (data.professional.skills?.length) {
      md += `### Technical Skills\n\n`;
      md += `${data.professional.skills.join(', ')}\n\n`;
    }
    
    if (data.professional.keywords?.length) {
      md += `### Keywords\n\n`;
      md += `${data.professional.keywords.join(', ')}\n\n`;
    }
  }

  // Work Experience
  if (data.resume?.length) {
    md += `## Work Experience\n\n`;
    data.resume.forEach((job: any) => {
      md += `### ${job.title} - ${job.company}\n`;
      md += `**Period:** ${job.period}\n\n`;
      
      if (job.description) {
        md += `${job.description}\n\n`;
      }
      
      if (job.highlights?.length) {
        md += `**Key Achievements:**\n`;
        job.highlights.forEach((highlight: string) => {
          md += `- ${highlight}\n`;
        });
        md += `\n`;
      }
    });
  }

  // Projects
  if (data.projects?.length) {
    md += `## Projects\n\n`;
    data.projects.forEach((project: any) => {
      md += `### ${project.title}\n`;
      if (project.period) {
        md += `**Period:** ${project.period}\n\n`;
      }
      
      if (project.description) {
        md += `${project.description}\n\n`;
      }
      
      if (project.highlights?.length) {
        md += `**Project Highlights:**\n`;
        project.highlights.forEach((highlight: string) => {
          md += `- ${highlight}\n`;
        });
        md += `\n`;
      }
    });
  }

  // Community Leadership
  if (data.community) {
    md += `## Community Leadership\n\n`;
    
    // MVP Status
    if (data.community.mvpStatus) {
      md += `### MVP Recognition\n\n`;
      md += `**Current Status:** ${data.community.mvpStatus}\n`;
      if (data.community.mvpProfileUrl) {
        md += `**Profile:** ${data.community.mvpProfileUrl}\n`;
      }
      md += `\n`;
      
      if (data.community.mvpAwards?.length) {
        md += `**Award History:**\n`;
        data.community.mvpAwards.forEach((award: any) => {
          md += `- **${award.year} ${award.type} MVP** (${award.status}): ${award.description}\n`;
          if (award.quote) {
            md += `  > "${award.quote}" — *${award.quoteSource}*\n`;
          }
        });
        md += `\n`;
      }
    }

    // Speaking Engagements
    if (data.community.presentations?.length) {
      md += `### Conference Presentations\n\n`;
      data.community.presentations.forEach((pres: any) => {
        md += `#### ${pres.sessionTitle || pres.title}\n`;
        md += `**Event:** ${pres.title} | **Location:** ${pres.location} | **Date:** ${pres.date}\n\n`;
        
        if (pres.description) {
          md += `${pres.description}\n\n`;
        }
        
        if (pres.topics?.length) {
          md += `**Topics:** ${pres.topics.join(', ')}\n`;
        }
        
        // Links
        const links = [];
        if (pres.videoUrl) links.push(`[Video](${pres.videoUrl})`);
        if (pres.sessionizeUrl) links.push(`[Sessionize](${pres.sessionizeUrl})`);
        if (pres.documentationUrl) links.push(`[Documentation](${pres.documentationUrl})`);
        if (links.length) {
          md += `**Links:** ${links.join(' | ')}\n`;
        }
        
        md += `\n`;
      });
    }

    // Media and Podcasts
    if (data.community.featuredMedia) {
      md += `### Featured Media\n\n`;
      md += `#### ${data.community.featuredMedia.title}\n`;
      md += `**Episode:** ${data.community.featuredMedia.episode}\n\n`;
      md += `${data.community.featuredMedia.description}\n\n`;
      
      const mediaLinks = [];
      if (data.community.featuredMedia.podcastUrl) mediaLinks.push(`[Podcast](${data.community.featuredMedia.podcastUrl})`);
      if (data.community.featuredMedia.videoUrl) mediaLinks.push(`[Video](${data.community.featuredMedia.videoUrl})`);
      if (data.community.featuredMedia.blogUrl) mediaLinks.push(`[Blog](${data.community.featuredMedia.blogUrl})`);
      if (mediaLinks.length) {
        md += `**Links:** ${mediaLinks.join(' | ')}\n\n`;
      }
    }

    // Additional Media Resources
    if (data.community.mediaResources?.podcasts?.length) {
      md += `### Podcast Appearances\n\n`;
      data.community.mediaResources.podcasts.forEach((podcast: any) => {
        md += `- **${podcast.title}**: ${podcast.description} - [Listen](${podcast.url})\n`;
      });
      md += `\n`;
    }

    // Expertise Areas
    if (data.community.expertiseAreas?.length) {
      md += `### Areas of Expertise\n\n`;
      data.community.expertiseAreas.forEach((area: any) => {
        md += `#### ${area.category}\n`;
        if (area.topics?.length) {
          area.topics.forEach((topic: string) => {
            md += `- ${topic}\n`;
          });
        }
        md += `\n`;
      });
    }
  }

  return md;
}
