import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import ShareButton from '@/components/ui/ShareButton';
import { prisma } from '@/lib/prisma';

export default async function ClassPage({ params }: { params: { slug: string; classId: string } }) {
  const slug = params.slug;
  const classId = Number(params.classId);
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-heading font-bold text-text">Course not found</h1>
          <Link href="/courses" className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-accent transition-colors">
            Back to Courses
          </Link>
        </div>
      </MainLayout>
    );
  }
  const classItem = await prisma.courseClass.findUnique({ where: { id: classId } });
  if (!classItem || classItem.courseId !== course.id) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-heading font-bold text-text">Class not found</h1>
          <Link href={`/courses/${course.slug}`} className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-accent transition-colors">
            Back to Course
          </Link>
        </div>
      </MainLayout>
    );
  }

  const totalClasses = await prisma.courseClass.count({ where: { courseId: course.id } });

  const nextClass = await prisma.courseClass.findFirst({
    where: { courseId: course.id, index: { gt: classItem.index } },
    orderBy: { index: 'asc' },
  });

  const relatedCourses = !nextClass
    ? await prisma.course.findMany({
        where: { category: course.category, NOT: { id: course.id } },
        take: 2,
      })
    : [];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center text-sm mb-8 text-gray-500 bg-gray-50 py-3 px-4 rounded-md">
          <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
          <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <Link href={`/courses/${course.slug}`} className="hover:text-primary transition-colors">{course.title}</Link>
          <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-primary font-medium">Class {classItem.index}</span>
        </div>

        <div className="bg-white border-b border-gray-200 mb-8 rounded-lg shadow-sm overflow-hidden">
          <div className="max-w-4xl mx-auto py-6 px-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                Class {classItem.index} of {totalClasses}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{classItem.title}</h1>
              <ShareButton compact variant="ghost" showLabel={false} url={typeof window !== 'undefined' ? window.location.href : ''} title={classItem.title} description={classItem.textContent || ''} />
            </div>
            <div className="flex items-center text-gray-600">
              <Image src="/user-avatar.svg" alt={course.instructor} width={32} height={32} className="rounded-full mr-3" />
              <span className="font-medium">{course.instructor}</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm mb-8">
          {classItem.contentType === 'video' && classItem.videoUrl ? (
            <div className="relative w-full p-6 sm:p-8">
              <div className="relative w-full overflow-hidden rounded-lg shadow">
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    src={classItem.videoUrl}
                    title={classItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="prose max-w-none p-6 sm:p-8">
              <p className="text-gray-700 leading-relaxed text-lg">{classItem.textContent || ''}</p>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {nextClass ? 'Continue Learning' : 'Recommended Courses'}
          </h2>
          {nextClass ? (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:bg-gray-50 transition-all">
              <Link href={`/courses/${course.slug}/${nextClass.id}`} className="block">
                <div className="flex items-center">
                  <div className="bg-primary/10 text-primary rounded-full p-3 mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">Next: {nextClass.title}</h3>
                    <p className="text-gray-500 text-sm">
                      Class {nextClass.index} of {totalClasses}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCourses.map((rc) => (
                <div key={rc.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all">
                  <Link href={`/courses/${rc.slug}`} className="block">
                    <div className="relative h-40">
                      <Image
                        src={rc.imageUrl || '/placeholder-course.svg'}
                        alt={rc.title}
                        fill
                        className="object-cover"
                        unoptimized={rc.imageUrl.endsWith('.svg')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-3 w-full">
                        <span className="bg-primary/90 text-white text-xs font-medium px-2 py-1 rounded-sm">
                          {rc.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{rc.title}</h3>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{rc.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-medium">
                          {rc.discountPrice ? (
                            <>
                              <span className="line-through text-gray-400 text-xs mr-1">${rc.price.toFixed(2)}</span>
                              ${rc.discountPrice.toFixed(2)}
                            </>
                          ) : (
                            `$${rc.price.toFixed(2)}`
                          )}
                        </span>
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{(rc.rating || 0).toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href={`/courses/${course.slug}`} className="inline-flex items-center text-primary hover:text-primary-dark transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Course
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
